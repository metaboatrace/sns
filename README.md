# SNS

## 概要

- Meta Boatrace のソーシャル機能を提供するWebアプリケーション
- ボートレースのレースデータに対するコメント・感想の投稿、ユーザー間のフォロー・いいね等のリアクション機能
- UGC（ユーザー生成コンテンツ）によるサービスのスケールを目指す

## 機能

### 認証・アカウント管理

| 機能 | 状態 | 説明 |
|---|---|---|
| Google OAuth ログイン | ✅ | Supabase Auth 経由の Google ログイン |
| ユーザー名設定 | ✅ | 初回ログイン時にユーザー名・表示名を設定 |
| ユーザー名バリデーション | ✅ | 形式チェック（2〜20文字、英小文字開始）、予約語チェック |
| Rate Limiting | ✅ | IP ベース + ユーザーID ベースの二段構え |
| Lame-name フィルタ | ✅ | 不適切なユーザー名の部分一致ブロック |
| RLS ポリシー | ✅ | profiles テーブルの行レベルセキュリティ |
| BAN 制御 | ✅ | BAN ユーザーの保護ルートアクセス拒否 |

## 認証フロー

### サインアップ（新規ユーザー）

```
Google OAuth ログイン
    ↓
Supabase Auth コールバック（/auth/callback）
    ↓
profiles テーブルにレコードなし
    ↓
/mypage/setup-username にリダイレクト
    ↓
ユーザー名・表示名を入力して送信
    ↓
POST /api/username でプロフィール作成
    ↓
/mypage にリダイレクト
```

### サインイン（既存ユーザー）

```
Google OAuth ログイン
    ↓
Supabase Auth コールバック（/auth/callback）
    ↓
profiles テーブルにレコードあり
    ↓
/mypage にリダイレクト
```

### ルーティング制御

- `(protected)` レイアウト: 未認証 → `/sign-in` にリダイレクト、BAN → `/banned` にリダイレクト
- `(provisional)` レイアウト: プロフィール設定済み → `/mypage` にリダイレクト
- `(confirmed)` レイアウト: プロフィール未設定 → `/mypage/setup-username` にリダイレクト

## アーキテクチャ

```
[ユーザー / 検索エンジン]
        |
        v
  [Next.js (Vercel)]  --- SSR/SSG (App Router)
     |            |
     v            v
[Supabase]    [Hasura GraphQL (AWS ECS)]
 - Auth            |
 - PostgreSQL      v
   (UGCデータ)  [RDS PostgreSQL]
                 (OriginData)
```

- SEO重視のため SSR/SSG を活用（Next.js App Router）
- 詳細は [docs/architecture.md](docs/architecture.md) を参照

## 技術スタック

| カテゴリ | 技術 | 選定理由 |
|---|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) (App Router) | SSR/SSG によるSEO対策 |
| 認証 | [Supabase Auth](https://supabase.com/docs/guides/auth) | IDaaS、無料枠あり、Auth0より低コスト |
| UGCデータベース | [Supabase PostgreSQL](https://supabase.com/docs/guides/database) | 認証と同一プラットフォームで管理コスト低減 |
| OriginData API | [Hasura GraphQL](https://hasura.io/docs/latest/) (AWS) | crawlersが収集したボートレースデータへのGraphQLアクセス |
| ORM | [Drizzle](https://orm.drizzle.team/) | Vercelサーバーレス環境でのコールドスタート性能 |
| UI | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | ユーティリティファーストCSS + コピーペースト型コンポーネント |
| パッケージマネージャー | [pnpm](https://pnpm.io/) | 高速なインストール |

## ディレクトリ構成

```
src/
├── app/
│   ├── (public)/          # 未認証でもアクセス可能なページ
│   │   ├── sign-in/       # サインインページ
│   │   └── banned/        # BAN通知ページ
│   ├── (protected)/       # 認証必須ページ（未認証→/sign-inリダイレクト）
│   │   └── mypage/
│   │       ├── (provisional)/  # プロフィール未設定ユーザー用
│   │       │   └── setup-username/
│   │       └── (confirmed)/    # プロフィール設定済みユーザー用
│   ├── api/
│   │   └── username/      # ユーザー名登録API
│   ├── auth/
│   │   └── callback/      # OAuth/OTP コールバック
│   └── admin/             # 管理者ページ
├── components/
│   ├── layout/            # Header, Footer, AuthStatusDisplay
│   └── ui/                # shadcn/ui コンポーネント
├── lib/
│   ├── db/                # Drizzle ORM スキーマ・接続
│   ├── supabase/          # Supabase クライアント（server, client, middleware）
│   ├── username.ts        # ユーザー名バリデーション
│   ├── reserved-usernames.ts  # 予約ユーザー名リスト
│   ├── lame-name.ts       # 不適切名フィルタ（server-only）
│   ├── rate-limit.ts      # ユーザーID ベース Rate Limiting
│   ├── rate-limit-ip.ts   # IP ベース Rate Limiting
│   └── auth.ts            # 認証ユーティリティ
└── messages/
    └── ja.json            # 日本語メッセージ
```

## 前提条件

以下のツールが必要です。

| ツール | 用途 |
|---|---|
| [Node.js](https://nodejs.org/) 24 | ランタイム。[Volta](https://volta.sh/) で管理 |
| [pnpm](https://pnpm.io/) | パッケージマネージャー |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Supabase ローカル開発で必須 |
| [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) | ローカル Supabase の起動・管理。`brew install supabase/tap/supabase` でインストール |

## ローカル開発セットアップ

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone https://github.com/metaboatrace/sns.git
cd sns
pnpm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーします。

```bash
cp .env.example .env.local
```

### 3. ローカル Supabase の起動

Docker Desktop が起動していることを確認し、以下を実行します。

```bash
supabase start
```

起動が完了すると、各サービスの URL やキーが出力されます。出力に含まれる `Publishable` の値を `.env.local` の `NEXT_PUBLIC_SUPABASE_ANON_KEY` に設定してください。

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase start で出力された Publishable key>
```

### 4. Google OAuth の設定（任意）

ローカルで Google ログインを使う場合は、Google Cloud Console で取得した OAuth クレデンシャルを `supabase/.env` に設定します。

```
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=<Google Cloud Console の Client ID>
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=<Google Cloud Console の Client Secret>
```

`supabase/.env.example` をコピーして使えます。

```bash
cp supabase/.env.example supabase/.env
```

これらの値は `supabase/config.toml` の `env()` 関数経由でローカル Supabase に読み込まれます。Google OAuth の詳しい設定手順は [docs/authentication-setup.md](docs/authentication-setup.md) を参照してください。

#### ローカル用リダイレクト URI の追加

Google Cloud Console でローカル開発用のリダイレクト URI を登録する必要があります。

1. [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services** > **Credentials** を開く
2. 該当の OAuth 2.0 クライアント ID をクリック
3. **Authorized redirect URIs** に以下を追加する

```
http://127.0.0.1:54321/auth/v1/callback
```

本番用の `https://<your-project-ref>.supabase.co/auth/v1/callback` はそのまま残してください。

> **注意:** この設定を行わないと、Google ログイン時に `redirect_uri_mismatch` エラーが発生します。

ローカル環境では Supabase Auth が `localhost:54321` で動作するため、Google からの OAuth コールバックはローカルの Supabase に送られます。本番環境では `https://<your-project-ref>.supabase.co` がコールバック先になります。

### 5. 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:3000 でアクセスできます。

### ローカル Supabase の停止

```bash
supabase stop
```

## テスト

```bash
# 全テスト実行
pnpm test

# ウォッチモード
pnpm test:watch
```

## データベース

### マイグレーション

```bash
# マイグレーションファイル生成
pnpm drizzle-kit generate

# マイグレーション実行
pnpm db:run-migrate

# Drizzle Studio（DBブラウザ）
pnpm db:studio
```

### テーブル

| テーブル | 説明 |
|---|---|
| `profiles` | ユーザープロフィール（username, displayName, avatarUrl, bio 等） |
| `rate_limit_events` | Rate Limiting イベント記録 |

### RLS ポリシー

profiles テーブルと rate_limit_events テーブルに Row Level Security を適用。詳細は `supabase/migrations/20260325104121_rls_policies.sql` を参照。

## 環境変数

`.env.example` にテンプレートがあります。ローカル開発と本番環境で設定値が異なるため、以下の表を参照してください。

| 環境変数 | ローカル | 本番 | 説明 |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `http://127.0.0.1:54321` | Supabase ダッシュボードの値 | Supabase API の URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `supabase start` 出力の Publishable の値 | Supabase ダッシュボードの値 | Supabase の Publishable キー |
| `DATABASE_URL` | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` | Supabase の接続文字列 | Drizzle ORM 用 |
| `HASURA_GRAPHQL_ENDPOINT` | `http://localhost:8080/v1/graphql` | 本番エンドポイント | Hasura GraphQL API |
| `HASURA_GRAPHQL_ADMIN_SECRET` | ローカル Hasura の値 | 本番の値 | Hasura 管理シークレット |

> 本番環境では、Google OAuth のクレデンシャルは Supabase ダッシュボード（Authentication > Providers > Google）で直接設定するため、アプリ側の環境変数は不要です。ローカル開発では `supabase/.env` に設定します（`supabase/.env.example` を参照）。これらはローカルの Supabase インスタンス（`supabase start`）が `config.toml` の `env()` 関数経由で読み込むためにのみ必要です。

## 関連リポジトリ

| リポジトリ | 概要 |
|---|---|
| [metaboatrace/crawlers](https://github.com/metaboatrace/crawlers) | データ収集（スクレイピング）+ Hasura GraphQL。OriginData の提供元 |

## 関連ドキュメント

- [docs/architecture.md](docs/architecture.md) - アーキテクチャ詳細
- [docs/authentication-setup.md](docs/authentication-setup.md) - 認証セットアップ手順
