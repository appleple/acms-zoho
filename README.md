# Zoho for a-blog cms

Zoho CRM とはオンラインの顧客管理システムです。a-blog cms のフォームと連携することによってお客様が入力した情報をZoho CRM 上に蓄積することができます。

## ダウンロード

[Zoho for a-blog cms](https://github.com/appleple/acms-zoho/raw/master/build/Zoho.zip)

## 動作環境

- a-blog cms: Ver. 3.2.x (3.3+ not tested yet)
- PHP: 8.1 – 8.5 (8.6+ not tested yet)

## インストール

1. ダウンロードしたファイルを解凍し、`Zoho` ディレクトリを a-blog cms の `extensions` ディレクトリに配置します。
2. 管理画面にログインし、`拡張アプリ管理` から `Zoho` をインストールします。

### 注意

config.server.php で HOOK_ENABLE を有効にしておく必要があります。

```php
define('HOOK_ENABLE', 1);
```


## 認証

Zoho CRM との連携にはOAuth認証が必要です。OAuth認証を行うためには、Zoho CRM のAPIを利用するためのクライアントを作成する必要があります。

### 認証コードの生成

下記のURLより API Console 画面を開きます。<br>
[https://api-console.zoho.com/](https://api-console.zoho.com/)

初めてAPI追加する場合は「GET STARTED」から登録画面に遷移してください。
クライアント作成画面に遷移すると、Client Type 選択画面が表示されます。ここでは「Server-based Applications」を選択してください。

![Client Type 選択画面](images/choose-a-client-type.png)

Client ID と Client Secret はあとでCMS側に入力するので控えておきます。

![Client ID と Client Secret](images/client-id-and-client-secret.png)

### OAuth認証

次に、CMS側でOAuth認証を行います。

#### envファイルの設定

a-blog cms 設置ディレクトリの .env ファイルに以下の情報を設定します。
以下の設定は任意で、それぞれ初期値が用意されています。

```
# トークンファイルの保存先ディレクトリ
# 未設定時はドキュメントルートを使用
ZOHO_TOKEN_PERSISTENCE_PATH=

# Zoho SDK ログの出力先ファイルパス
# 未設定時はドキュメントルートにphp_zoho_sdk.logが出力
ZOHO_LOGGER_FILE_PATH=

# Zoho API レスポンスのキャッシュ有効期間（秒）
# 未設定時は3600
ZOHO_CACHE_LIFETIME=
```

#### 認証

次に、先ほど取得した、Client ID、Client Secretを拡張アプリ管理画面から入力していきます。

あわせて、**接続環境（本番 / サンドボックス / 開発者）とデータセンター（US / EU / IN / … / JP）**を管理画面のセレクトで選択します。テスト用にサンドボックスへ接続する場合は「サンドボックス」を選択してください（未選択時は 本番 / US）。トークンは環境ごとに別管理のため、環境を変更する場合は一度認証解除して、選択し直したうえで再認証してください。

入力後は設定を保存し、「認証」ボタンをクリックします。クリックすると、認証トークンを入力するプロンプトが表示されるので、API Console で取得した認証トークンを入力して認証を行います。

認証が完了すると、下の図のように「認証済み」というラベルが表示され、認証に利用しているZohoアカウントに設定されているメールアドレスが表示されます。

![認証完了画面](images/success-authorization.png)


## 拡張アプリZohoの使い方

管理画面 > フォーム管理 > 設定したいフォームID よりフォームに対するZohoの設定を行うことができます。<br>
a-blog cmsのフォームから送信されたカスタムフィールドのフィールド名に対してZohoの項目のラベルを紐づけることで、a-blog cms側のフォームの送信結果をZohoに送信することができます。

Zohoの項目のラベルは設定 > タブと項目から確認できます。

![Zohoの項目のラベルは設定 > タブと項目から確認できます](images/zoho-field-label.png)

以下3つの作業が必要になります。

1. フォームの権限設定
2. Zoho カスタムフィールドの設定
3. Zoho リレーショナル設定

### 1. タブのユニークキー設定

フォームIDごとに、Zohoのどのタブに対してデータの作成及びデータの更新ができるかを設定できます。
設定するにはAPI項目名が必要ですので、ZohoCRMの設定から 開発者向け情報 > APIとSDK で設定したいタブから項目のAPI名を確認してください。

例えば、下の画像の場合、商談タブの Drop_In_Number項目がユニークキーになっており、ユニークキーが共通のタブ同士の場合は、Emailのようにまとめて設定することができます。

![フォームの権限設定の例](images/zoho-permission-config.png)

### 2. Zohoと連携するa-blog cmsフィールドの設定

次は、カスタムフィールドの設定です。ここでは a-blog cms のフォームから送信されたカスタムフィールドのフィールド名とZoho側のカスタムフィールドの項目のラベルの紐付けを行います。

例えば、一番最初の列では、nameの項目はZohoの 見込み客タブ と 連絡先タブ の 姓 に対応しています。

a-blog cmsのカスタムフィールド名横にあるチェックボックスにチェックを入れることで、フィールドに指定したテキストをそのまま送信できるようになります。また、グローバル変数も対応しています。

フォームの権限設定で追加するタブを設定している場合は、Zohoと連携するa-blog cmsフィールドの設定に、ユニークキーになる項目のラベルを追加し、追加を有効にしてください。

また、フォームの権限設定で更新するタブを設定している場合は、Zohoと連携するa-blog cmsフィールドの設定に、ユニークキーになるものの項目を追加し、更新を有効にしてください。

![Zoho カスタムフィールドの設定例](images/zoho-field-config.png)

### 3. Zoho リレーショナル設定

また、Zoho側に登録したデータどうしをlookupIDを通して紐づけることができます。

例えば商談タブに、見込み客または連絡先に登録されているユーザーの情報（誰との商談なのか）を紐付けることができます。以下の画像では、商談の関連見込み客というルックアップID（フィールド）に、見込み客タブのメール情報で比較して紐づけています。

![Zoho リレーショナル設定例](images/zoho-lookup-config.png)

## ルックアップフィールドタイプの仕様

### ルックアップフィールド（`lookup`）

通常のルックアップフィールドは **Zoho リレーショナル設定** を通じて自動解決されます。フォームの値（メールアドレス等）を元に既存レコードを検索し、見つかったレコードIDをセットします。

- 空値はスキップされます（警告ログなし）
- 数値（レコードID）以外の値が直接セットされた場合は警告ログを出力してスキップされます

### オーナー/ユーザールックアップフィールド（`ownerlookup` / `userlookup`）

`ownerlookup` および `userlookup` フィールドは、**Zoho ユーザーIDを直接値としてセット**する必要があります。メールアドレスやユーザー名から自動解決する機能は現時点では提供していません。

- 空値はスキップされます（警告ログなし）
- 数値（ユーザーID）以外の値が指定された場合は警告ログを出力してスキップされます

Zoho ユーザーIDは Zoho CRM の設定 > ユーザー管理から確認できます。

### 複数選択ルックアップフィールド（`multiselectlookup`）

`multiselectlookup` フィールドは現時点では**未対応**です。値が指定されてもエラーログを出力してスキップされます。

## フック

Zoho プラグインでは以下のフックポイントを提供しています。

### beforeZohoRequest

Zoho CRM へのデータ送信前に呼ばれます。

**引数**
- `$postModule` : ACMS_POST_Form_Submit インスタンス

### afterZohoRequestSuccess

Zoho CRM へのデータ送信が成功した後に呼ばれます。

**引数**
- `$postModule` : ACMS_POST_Form_Submit インスタンス

### afterZohoRequestError

Zoho CRM へのデータ送信でエラーが発生した場合に呼ばれます。

**引数**
- `$postModule` : ACMS_POST_Form_Submit インスタンス
- `$throwable` : 発生した例外オブジェクト

### afterZohoRequest

Zoho CRM へのデータ送信処理の完了後(成功/エラー問わず)に呼ばれます。

**引数**
- `$postModule` : ACMS_POST_Form_Submit インスタンス

## 開発（テスト / 静的解析 / CI）

PHP 側の品質チェック（コーディング規約・静的解析・自動テスト）は Docker 上で実行します。基盤は
[`ablogcms/testing-framework`](https://packagist.org/packages/ablogcms/testing-framework) と、a-blog cms
本体同梱の `appleple/acms` オールインワンイメージ（コア + composer 込み）です。

### 前提

- Docker / Docker Compose
- 検証対象の a-blog cms は 3.2 系、PHP は 8.1〜8.5

### ディレクトリと役割

- PHP のプラグイン本体は `app/`（名前空間 `Acms\Plugins\Zoho\`）。配布時は `app/vendor/` に Zoho SDK
  （`zohocrm/php-sdk-8.0`）を同梱する。ランタイム依存は `app/composer.json` で管理する。
- 管理画面 UI（React / TypeScript）は `src/`。ビルド成果物は `app/dist`（Vite）。
- 開発用の依存（testing-framework / PHPUnit / PHPStan / PHP_CodeSniffer など）はリポジトリ直下の
  `composer.json` の `require-dev` で管理する。
- テストは `tests/`（`Unit` = DB 非依存、`Integration` = DB 依存）。

### セットアップと実行

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

### テスト方針

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

### CI（GitHub Actions）

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
