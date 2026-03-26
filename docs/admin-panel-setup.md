# 管理画面セットアップ

管理画面は `/admin` でユーザー管理などの機能を提供します。`user_roles` テーブルと Supabase Auth の Custom Access Token Hook を使った Role-Based Access Control (RBAC) で保護されています。

## アーキテクチャ

```
/admin へのリクエスト
  |
  v
middleware.ts (Edge)
  └── 認証済みか？ → No → 404
  |
  v
admin/layout.tsx (Server)
  └── user_roles に admin ロールがあるか？ → No → 404
  |
  v
管理画面を表示
```

- **middleware.ts**: Edge での軽量な認証チェック。未認証ユーザーには 404 を返す（管理画面の存在を漏らさない）。
- **admin/layout.tsx**: Drizzle 経由で `user_roles` テーブルを参照し、`admin` ロールを持つか検証する。非管理者には 404 を返す。
- **Custom Access Token Hook**: JWT に `user_role` を埋め込み、RLS ポリシーで使用する。admin/layout.tsx では直接使用しないが、データベースレベルのセキュリティに必要。

## 前提条件

- Supabase プロジェクトで Auth が有効化されていること（[authentication-setup.md](authentication-setup.md) 参照）
- 少なくとも 1 名のユーザーがサインアップ済みであること
- `SUPABASE_SERVICE_ROLE_KEY` 環境変数（後述）

## セットアップ

### 1. 環境変数の追加

`SUPABASE_SERVICE_ROLE_KEY` を環境に追加する：

- **ローカル**: `.env.local` に追加
- **Vercel**: Project Settings > Environment Variables に追加

値は Supabase Dashboard > **Project Settings** > **API Keys** > `service_role`（secret）から取得する。

> **WARNING**: `NEXT_PUBLIC_` プレフィックスを付けないこと。このキーは Supabase へのフルアクセス権限（RLS バイパス、ユーザー管理）を持ち、ブラウザに公開してはならない。admin クライアントヘルパーは `import 'server-only'` で保護されている。

### 2. データベーススキーマの適用

`user_roles` テーブルは Drizzle スキーマに含まれている。以下で適用する：

```bash
pnpm db:run-migrate
```

Drizzle マイグレーションを実行し、Supabase 環境では Supabase 固有の SQL（RLS ポリシー、auth hook、profiles 設定、storage avatars）も自動適用する。本番環境（Supabase）では手動操作不要 — `prebuild` スクリプトがデプロイ時に `pnpm db:run-migrate` を自動実行する。

### 3. Custom Access Token Hook の適用

hook 関数は `drizzle/supabase/custom_access_token_hook.sql` にある。これは自動処理 — `pnpm db:run-migrate` が Supabase 環境を検出し、マイグレーション後にデプロイ時に hook を適用する。

> **Note**: hook SQL は Supabase 管理ロール（`supabase_auth_admin`、`authenticated`、`anon`）が必要なため、ローカルの PostgreSQL では意図的に失敗する。これは想定通り — hook は Supabase 環境でのみ意味を持つ。

### 4. Supabase Dashboard で Hook を有効化

SQL を適用した後、Supabase で hook を登録する：

1. **Authentication** > **Hooks** に移動
2. **Custom Access Token Hook** を有効化
3. スキーマを選択: `public`
4. 関数を選択: `custom_access_token_hook`
5. 保存

これは**一度だけの設定**。`CREATE OR REPLACE` で関数を更新しても再登録は不要。

### 5. Admin ロールの付与

ユーザー ID を確認し、admin ロールを挿入する：

```sql
-- ユーザー ID の確認
SELECT id, email FROM auth.users;

-- admin ロールの付与
INSERT INTO user_roles (user_id, role) VALUES ('<your-uuid>', 'admin');
```

実行場所：

- **ローカル**: `psql postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **リモート**: Supabase Dashboard > **SQL Editor**

### 6. サインアウトして再サインイン

JWT は次回トークン発行時に更新される。新しいロールを反映するため、サインアウトして再サインインする。

### 7. 動作確認

`/admin` にアクセスし、管理画面が表示されることを確認する。

**確認チェックリスト：**

- admin アカウント: `/admin` でダッシュボードが表示される
- 非 admin アカウント: `/admin` で 404 が返される
- 未サインイン: `/admin` で 404 が返される

## ローカル開発での注意事項

ローカル開発では、ステップ 1、2、5 のみが必要：

1. `.env.local` に `SUPABASE_SERVICE_ROLE_KEY` を追加
2. `pnpm db:run-migrate` でマイグレーションを実行し `user_roles` テーブルを作成
3. ローカルデータベースに admin ロールを挿入

ステップ 3-4（hook 設定）は Supabase 専用。admin/layout.tsx が Drizzle 経由で `user_roles` テーブルを直接参照するため、hook なしでも管理画面の認可は動作する。

## 利用可能なスクリプト

| スクリプト | 説明 |
|-----------|------|
| `pnpm db:run-migrate` | マイグレーション + Supabase SQL を実行（Supabase を自動検出） |

## セキュリティに関する注意事項

- `user_roles` テーブルは **Row Level Security (RLS) が有効** で、`authenticated` / `anon` ロールへの許可ポリシーはない。ユーザーは Supabase クライアント経由でロールの読み取りや変更ができない。
- `SUPABASE_SERVICE_ROLE_KEY` はサーバーサイドコードのみで使用し、`import 'server-only'` で保護されている。
- 管理画面のルートは 403 ではなく 404 を返し、管理画面の存在を漏らさない。
- middleware での管理パスのマッチングは大文字小文字を区別せず、`/Admin` や `/ADMIN` によるバイパスを防止する。
