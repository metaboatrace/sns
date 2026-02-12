# アーキテクチャ

## データフロー

```
[ユーザー]                          [検索エンジン]
    |                                    |
    v                                    v
+------------------------------------------+
|          Next.js (Vercel)                |
|          App Router (SSR/SSG/ISR)        |
+----+----------------+-------------------+
     |                |
     v                v
+-----------+   +---------------------------+
| Supabase  |   | Hasura GraphQL            |
| - Auth    |   | (AWS ALB -> ECS Fargate)  |
| - PgSQL   |   +---------------------------+
| (UGC)     |                |
+-----------+                v
                  +--------------------+
                  | RDS PostgreSQL     |
                  | (OriginData)       |
                  +--------------------+
```

1. ユーザー -> Next.js (Vercel): ページリクエスト
2. Next.js SSR -> Supabase Auth: 認証・セッション管理
3. Next.js SSR -> Supabase PostgreSQL: UGCデータの読み書き（コメント、フォロー、いいね等）
4. Next.js SSR -> Hasura GraphQL (AWS ALB -> ECS Fargate) -> RDS PostgreSQL: OriginData の取得（レース、選手等）
5. 検索エンジン -> Next.js: SSG/ISR によるプリレンダリングページの配信

## 認証

- [Supabase Auth](https://supabase.com/docs/guides/auth) を IDaaS として採用（自前実装しない）
- 選定理由:
  - Auth0: MAU課金で高コスト
  - Cognito: 開発体験が劣る
  - Supabase: 無料枠が十分、PostgreSQL と統合済み

## データベース構成

2つの PostgreSQL が存在する。

| DB | 管理者 | 用途 | アクセス方法 |
|---|---|---|---|
| Supabase PostgreSQL | SNS (このリポジトリ) | UGCデータ（ユーザー、コメント、フォロー、いいね等） | [Drizzle ORM](https://orm.drizzle.team/) |
| AWS RDS PostgreSQL | [crawlers](https://github.com/metaboatrace/crawlers) | OriginData（レース、選手、オッズ等） | [Hasura GraphQL](https://hasura.io/docs/latest/) |

分離理由: データのオーナーシップが異なる。OriginData は crawlers が管理し、UGC は SNS が管理する。

## ホスティング

- 初期: [Vercel](https://vercel.com/)（無料枠で開始）
- スケール後: AWS移行を検討
- Vercel選定理由: Next.js との親和性、ゼロコンフィグデプロイ

## リアルタイム機能

- 初期フェーズでは不要
- レース中のリアルタイムコメントは実装しない
- 将来必要になった場合は [Supabase Realtime](https://supabase.com/docs/guides/realtime) を検討
