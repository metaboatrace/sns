# SNS

## 概要

- Meta Boatrace のソーシャル機能を提供するWebアプリケーション
- ボートレースのレースデータに対するコメント・感想の投稿、ユーザー間のフォロー・いいね等のリアクション機能
- UGC（ユーザー生成コンテンツ）によるサービスのスケールを目指す

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

## セットアップ

```bash
# Node.js 24 (Volta で管理: https://volta.sh/)
pnpm install
pnpm dev
```

`http://localhost:3000` で開発サーバーが起動する。

## 関連リポジトリ

| リポジトリ | 概要 |
|---|---|
| [metaboatrace/crawlers](https://github.com/metaboatrace/crawlers) | データ収集（スクレイピング）+ Hasura GraphQL。OriginData の提供元 |
