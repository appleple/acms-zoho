# 開発（テスト / 静的解析 / CI）

PHP 側の品質チェック（コーディング規約・静的解析・自動テスト）は Docker 上で実行します。基盤は
[`ablogcms/testing-framework`](https://packagist.org/packages/ablogcms/testing-framework) と、a-blog cms
本体同梱の `appleple/acms` オールインワンイメージ（コア + composer 込み）です。

## 前提

- Docker / Docker Compose
- 検証対象の a-blog cms は 3.2 系、PHP は 8.1〜8.5

## ディレクトリと役割

- PHP のプラグイン本体は `app/`（名前空間 `Acms\Plugins\Zoho\`）。配布時は `app/vendor/` に Zoho SDK
  （`zohocrm/php-sdk-8.0`）を同梱する。ランタイム依存は `app/composer.json` で管理する。
- 管理画面 UI（React / TypeScript）は `src/`。ビルド成果物は `app/dist`（Vite）。
- 開発用の依存（testing-framework / PHPUnit / PHPStan / PHP_CodeSniffer など）はリポジトリ直下の
  `composer.json` の `require-dev` で管理する。
- テストは `tests/`（`Unit` = DB 非依存、`Integration` = DB 依存）。

## セットアップと実行

```bash
# 環境変数（使用する appleple/acms イメージのタグ）を用意
cp .env.example .env

# コンテナ（a-blog cms 本体 + MySQL）を起動
docker compose up -d --wait

# 開発依存をインストール
docker compose exec acms bash -lc "cd /workspace && composer install"

# 同梱ランタイム依存（Zoho SDK）を app/vendor に用意（PHPStan のシンボル解決・テスト実行に必要）
docker compose exec acms bash -lc "cd /workspace && composer install --working-dir=app"

# テスト用 DB スキーマを作成（Integration テスト用）
docker compose exec acms bash -lc "cd /workspace && ACMS_ROOT=/var/www/html vendor/bin/acms-create-database"

# 一括チェック（lint → analyse → test）
docker compose exec acms bash -lc "cd /workspace && ACMS_ROOT=/var/www/html composer check"
```

個別に実行する場合:

```bash
composer lint      # PHP_CodeSniffer（PSR-12 + PHPCompatibility 8.1-8.5）
composer format    # phpcbf による自動整形
composer analyse   # PHPStan（level 6、PHP 8.1-8.5 レンジ）
composer test      # PHPUnit（Unit + Integration）
```

カバレッジ:

計測ドライバは **PCOV**（appleple/acms イメージ同梱。Xdebug は入っていない）。PCOV は既定で無効
（`pcov.enabled=0`）なので、実行時に有効化して計測する。下記の `composer coverage` がその起動を
まとめている（`php -d pcov.enabled=1 -d pcov.directory=app vendor/bin/phpunit --coverage-text` 相当）。

```bash
docker compose exec acms bash -lc "cd /workspace && composer coverage"
```

ローカルで本体パスやDB接続を変えたい場合は、`*.dist` をコピーした `phpunit.xml` / `phpstan.neon` /
`phpcs.xml` / `.env` で上書きします（これらは Git 管理外）。

## テスト方針

- **Unit**（`Acms\TestingFramework\TestCase`）: 通信を伴わない検証可能なロジックを対象にする。
  - フォーム値・拡張アプリ設定（`Field`）を注入して決定的に検証できる純粋なドメインロジック
    （`Services/Zoho` の `Models` / `Builder` / `Mapper` / `Collections`）。
  - ラベル → API 名の解決（`Api\ApiBase`）、トークンの CSV 永続化（`Store` / `Store\File` / `CustomFileStore`：
    一時ファイルで往復検証）。
  - HTTP/SDK に囲まれた純粋ヘルパ（`RecordApi` の日付/数値/時刻変換、`Engine` の依存レベル計算）は、
    Client を要するコンストラクタを避けて Reflection で直接検証する。
- **Integration**（`Acms\TestingFramework\DatabaseTestCase`）: DB 依存ロジック。トランザクションで各テストを
  分離・ロールバックする。本プラグインは独自 DB テーブルを持たず、DB 依存はコア `config` テーブルの読み取り
  （`Client::getTokenIdByBid`）のみ。
- カバレッジ目標は「意味のある単体テストで検証できる層」（`Models` / `Builder` / `Mapper` / `Collections` /
  `Store` / `Api\ApiBase`）で **行 90% 以上**（現状 91%超）。Zoho SDK 経由の実 HTTP 通信・SDK 初期化・
  GET/POST/Hook/Engine の送信本体など、単体では意味のある形でカバーできない通信/exit 境界は実機 / E2E の
  領域として計測から除外している（`phpunit.xml.dist` の `<source>` 参照）。数字合わせのための無意味なテストは置かない。
- PHPStan は level 6。テスト済みのロジック層は本体を修正してクリーンにし、未テストの HTTP/SDK/
  インフラ層の既存型負債は `phpstan-baseline.neon` に捕捉している。新規・変更コードは level 6 で検査される。

## CI（GitHub Actions）

`.github/workflows/ci.yaml` が push / pull request で実行されます。

- **quality**: `composer lint`（PHPCompatibility 8.1-8.5）+ `composer analyse`（PHPStan level 6）を 1 回。
- **phpunit**: PHP 8.1 / 8.2 / 8.3 / 8.4 / 8.5 のマトリクスで MySQL を併走させて実行。
- **js**: 管理画面 UI（TypeScript）の型チェック + Vite ビルド。
- **ci**: 上記すべての成功を集約する必須チェック（ブランチ保護ではこのジョブを必須に指定する）。

依存更新は `.github/dependabot.yml`（GitHub Actions + 開発用 Composer + フロントエンド npm/pnpm）が週次で提案し、patch / minor は
`.github/workflows/dependabot-auto-merge.yml` が CI 通過後に自動マージします（major は手動レビュー）。
自動マージには、リポジトリ Settings で **"Allow auto-merge" を有効化**し、デフォルトブランチのブランチ保護で
集約ジョブ **`ci`** を必須ステータスチェックに指定しておく必要があります（未設定だと CI を待たずにマージされます）。

配布 zip のビルドと GitHub Release への公開は `v*` タグの push で `.github/workflows/release.yml` が行います。
