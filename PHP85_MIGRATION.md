# acms-zoho — PHP 8.5 対応 記録

- 最終更新: 2026-07-17 / ブランチ: `master`
- 実行環境: PHP 8.5.8 / Composer 2.9 / cweagans/composer-patches 2.0
- 前提: 対象の非推奨はすべて `E_DEPRECATED`（fatal ではない）。本体コード（`app/` の `Acms\Plugins\Zoho`）はクリーン。問題は同梱 SDK に限られる。

## 結論（現状）

- **プロジェクトの品質ゲート（`composer lint` = phpcs `8.1-8.5`, vendor 除外）は PASS。** 本体 `app/` + `tests/` は 8.5 でクリーン。
- 同梱 SDK `zohocrm/php-sdk-8.0` を **4.0.0 → 5.0.0 に更新**（5.x でも非推奨面は 4.x と完全同一。更新は互換性維持のため）。
- SDK の「明確に no-op / 別名」な非推奨 16 件を **cweagans/composer-patches v2 で自動パッチ**（ビルド時適用）。
- 残りの SDK 非推奨（暗黙 nullable 引数 203 / CSV escape 8）は **未対応（意図的）** … 後述の理由により受容し、ここに記録する。

## 対応済みの非推奨（パッチで解消・16件）

パッチ: `app/patches/zohocrm-php-sdk-8.0-php85.patch`（9ファイル・151行、`git apply`/`patch -p1` 両対応）

| 種別 | 件数 | 変換 |
|---|---|---|
| `ReflectionProperty/Method::setAccessible(true)` | 12 | 行削除（8.1 以降 no-op。8.5 で非推奨） |
| `curl_close(...)` | 2 | 行削除（8.0 以降 no-op） |
| `(double)` キャスト | 2 | `(float)` に置換（別名。8.5 で非推奨） |

いずれも挙動不変。**注意: `setAccessible` の 8.5 非推奨は phpcs PHPCompatibility では検出されない**（実機 PHP 8.5 で `E_DEPRECATED` 発火を確認済み）。

## パッチ機構（cweagans/composer-patches v2）

- `app/composer.json`:
  - `require` に `cweagans/composer-patches: ^2.0`（**`require-dev` にすると配布ビルドの `--no-dev` でスキップされるため、あえて `require`**）
  - `config.allow-plugins.cweagans/composer-patches: true`
  - `extra.patches` にパッチを宣言（compact 形式。ローカル相対パスを `url` として解決）
- ビルド（`Packager::installRuntimeDeps()` → `composer install --working-dir=app --no-dev`）時に自動適用される。
- `app/patches.lock.json` は **`.gitignore` 済み**（vendor と同様、ビルド時に自動生成／再解決される。sha256 結合による陳腐化を避けるため非コミット）。
- **配布 zip からは build-time 専用物を除去**（`scripts/Packager.php` の `IGNORES`）: `vendor/cweagans` / `patches/` / `patches.lock.json`。実行時は不要な死蔵コードのため。残る autoload/installed.json のエントリは、a-blog cms 実行時に参照されないため無害。

### パッチの再生成手順（SDK 版更新などで当たらなくなった時）

1. pristine な SDK を用意（例: `/tmp` に `zohocrm/php-sdk-8.0:^5.0` を単体 `composer require`）。
2. `src` を 2 つコピー（`a/src`, `b/src`）し、`b/src` に対して以下の 3 変換を適用:
   - `^\s*.*->setAccessible\(true\);\s*$` の行を削除
   - `^\s*curl_close\(.*\);\s*$` の行を削除
   - `(double)` → `(float)`
3. `diff -ruN a b`（`a/src…` `b/src…` になるよう実行）→ `---`/`+++` 行のタイムスタンプを除去 → `app/patches/zohocrm-php-sdk-8.0-php85.patch` に保存。
4. **`rm -f app/patches.lock.json`（陳腐化した sha256 を破棄）** → 再ビルドで再解決。
   - あるいは `composer patches-relock --working-dir=app`。
   - ※ lock を消さずにパッチ内容だけ変えると v2 は旧 sha を適用しようとして失敗する（本対応中に実測）。

## 未対応の非推奨（意図的に残す・記録）

phpcs `PHPCompatibility --runtime-set testVersion 8.5` を **SDK に対して**実行した場合の残り（本来は vendor 除外で lint 対象外）:

| 種別 | 件数 | 実行時に E_DEPRECATED が出るか | 判断 |
|---|---|---|---|
| 暗黙 nullable 引数（`Type $x = null`） | 203 | 出る（**コンパイル時**。opcache 有効なら実質ワーカー起動時 1 回／読込クラスのみ） | 残す |
| CSV escape（`str_getcsv` 等の `$escape` 省略） | 8 | 呼ばれた時のみ。SDK 標準 `FileStore` 内で、本プラグインは独自 `CustomFileStore`（escape 明示済み）を使うため実行経路に乗らない公算大 | 残す |
| `resource`（クラス名 `Resource` 7件） | 7 | **出ない**（phpcs の前方互換助言のみ。8.5 で動作する） | 対象外 |
| `New uniform variable syntax` | 2 | 出ない（phpcs のパーサ上の情報） | 対象外 |

**残す理由**: (1) すべて vendor 配下で、プロジェクトは元々 vendor を lint 除外・CSV sniff も明示除外している。(2) fatal ではなく E_DEPRECATED。(3) 暗黙 nullable はコンパイル時発火のため opcache 下では実質ワーカーあたり 1 回、かつ実際に読み込まれたクラスのみ。(4) 203 件の署名書き換えはトークナイザ/Rector が必要でパッチが大きく肥大化し、SDK 版更新のたびに再生成が要る（コスト・破損リスク大）。

> 実行時ノイズが問題化した場合の恒久策候補: `?Type` への一括書き換え（Rector `ExplicitNullableParamTypeRector` 等）をパッチ化、または SDK を撤去して REST 直叩きに置換。

## 検証結果（この環境: PHP 8.5.8）

- `composer lint`（phpcs `8.1-8.5`）: **PASS（49/49）**。
- クリーンビルド（`rm -rf app/vendor app/patches.lock.json && composer install --no-dev`）でパッチ自動適用 → SDK の setAccessible/curl_close/(double) が **0/0/0**、対象 9 ファイル `php -l` OK。
- `composer package` の実配布 zip: 同梱 SDK は 5.0.0 かつパッチ済み（0/0/0）、cruft（cweagans / patches / patches.lock.json）除去済み、トップレベル composer.json 除去済み。
- SDK 5.x 互換 smoke test（`CustomFileStore` が 5.x `TokenStore` を満たす〔新設 `deleteTokens()` を親 `FileStore` から継承〕、初期化経路 `OAuthBuilder`/`InitializeBuilder`/`Initializer`/`USDataCenter`/`LogBuilder`、レコード経路 `Record`/`RecordOperations`/`BodyWrapper` の生成・メソッド有無）: **全 PASS**。
- プラグインが import する SDK クラス 46 種はすべて 5.x に存在。

## この環境で実施できていない検証（要 a-blog cms 本体環境）

- `composer analyse`（phpstan）: 設定が `/var/www/html/php`（CMS 本体）を参照するため未実行。
- `composer test`（phpunit）: `ACMS_ROOT`（CMS 本体）未設定のため未実行。
- Zoho CRM への OAuth 認証・レコード作成の実機経路。

→ **CMS 本体のある環境で `composer analyse` / `composer test` と実機の認証・登録フローを必ず確認すること**（4→5 のメジャー更新のため、静的解析・smoke で拾えない実行時挙動差の最終確認）。
