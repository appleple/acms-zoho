# Zoho for a-blog cms

Zoho CRM とはオンラインの顧客管理システムです。a-blog cmsのフォームと連携することによってお客様が入力した情報をZoho CRM 上に蓄積することができます。

## ダウンロード

[Zoho for a-blog cms](https://github.com/appleple/acms-zoho/raw/master/build/Zoho.zip)

## 動作環境

php: >=7.4

## 設定

下記のURLより API Console 画面を開きます。<br>
[https://api-console.zoho.com/](https://api-console.zoho.com/)

初めてAPI追加する場合は「GET STARTED」から登録画面に入ります。

<img width="1037" alt="welcome" src="https://user-images.githubusercontent.com/41937532/136872658-c134b8bd-d632-4ccd-80d4-a07ff15365ad.png">

Self Client API を追加します。

![select](https://user-images.githubusercontent.com/41937532/136872684-a07e37db-bb8b-49d9-b669-d9e9425381f2.png)

Client ID と Client Secret はあとでCMS側に入力するので控えておきます。

<img width="369" alt="secret" src="https://user-images.githubusercontent.com/41937532/136877162-55648f6d-3a9b-406f-87fc-e263daa718dc.png">

Generate Code タブを開いてトークン生成します。

スコープには `ZohoCRM.modules.all,ZohoCRM.settings.all` と入力してください。<br>
期限は何分でも構いませんが、その期限内にoAuth認証を済ませる必要があります。<br>
入力をすませるとoAuth認証に必要なgrantトークンが表示されるはずです。このトークンを覚えておきましょう。

<img width="371" alt="code" src="https://user-images.githubusercontent.com/41937532/136876932-13db0112-6c22-4e9a-93a7-94eb97da0c92.png">
<img width="844" alt="crm-select" src="https://user-images.githubusercontent.com/41937532/136877048-cb0638d1-0a28-4b2e-9b21-5654bb2368ae.png">
<img width="526" alt="copy" src="https://user-images.githubusercontent.com/41937532/136877123-01c70ea4-c75d-45fe-9d7b-a3bc801f6dd5.png">

※API を CREATE した時に「You are not a part of any ZohoCRM service orgs. Please remove the scope to generate the token.」と出る場合は Zoho CRM が未登録になっているので先にCRMへの登録をしてください。<br>
[https://crm.zoho.com/crm/ShowHomePage.do](https://crm.zoho.com/crm/ShowHomePage.do)

先ほどの、認証スコープ、Client ID、Client Secret、grantトークン、Zohoで登録しているメールアドレスなどを入力していきます。<br>
入力後は設定を保存し、「認証」ボタンをクリックします。無事に認証ができると、下の図のように「認証済み」というラベルが表示されるはずです。

![sumi](https://user-images.githubusercontent.com/41937532/136877663-77e66bc8-b9fb-462c-be0a-79c050916073.png)

### 注意

config.server.phpでHOOKを有効にしておく必要があります。

```php
define('HOOK_ENABLE', 1);
```

## 拡張アプリZohoの使い方

「管理画面 > フォーム管理 > 設定したいフォームID」よりフォームに対するZohoの設定を行うことができます。<br>
a-blog cmsのForm内のキーに対してZoho側のキーを紐づけることで、a-blog cms側のフォームの送信結果を処理してzohoに送信することができます。Zoho側のキーは下の図のようにラベル名に対応しています。

![](zoho_keys.png)

以下3つの作業が必要になります。

1. Formの権限設定
2. Zohoのカスタムフィールドの設定
3. lookupIdの関連付け

![](zoho-keys.png)

### 1. フォームの権限設定

フォームIDごとに、Zohoのどのスコープに対してInsert（データの挿入）及びUpdate（データの更新）ができるかを設定できます。<br>
例えば、下の画像の場合、Leads,CustomModule6のスコープに対してデータ挿入の権限があり、Leads,Contactsのスコープに対してはデータ更新の権限があります。

![form01](https://user-images.githubusercontent.com/41937532/136880142-9d625559-ea81-445c-8ab0-e7ff2ede2198.png)

### 2. Zohoのカスタムフィールドの設定

次は、カスタムフィールドの設定です。ここではa-blog cmsのフォーム側の変数とZoho側のカスタムフィールドの紐付けを行います。<br>
例えば、一番最初の列では、nameの項目はzoho側のCustomModule6,Leads,Contactsのスコープの 姓 に対応しています。

フォームの権限設定でInsertするタブを設定している場合は、カスタムフィールド設定にユニークキーになるものの項目を追加しInsertにチェックをいれてください。また、フォームの権限設定でUpdateするタブを設定している場合は、カスタムフィールド設定ユニークキーになるものの項目を追加しUpdateにチェックをいれてください。

![form02](https://user-images.githubusercontent.com/41937532/136880366-4b5ae510-a271-4ef2-907a-74b1ab578a55.png)

### 3. lookupIDの関連付け

またZoho側に登録したデータどうしをlookupIDを通して紐づけることができます。<br>
例えば、そのお問い合わせをしたユーザー（Zohoに登録されているまたはお問い合わせと同時に登録されたユーザー）が誰なのかをルックアップIDを使って以下のように紐づけます。<br>
ルックアップIDにはそのルックアップIDに使用されているZoho側のラベル名を登録します。

![form03](https://user-images.githubusercontent.com/41937532/136880673-1ad47430-85bf-44c1-9265-5e8223721ec1.png)

Gitで管理している場合、以下ファイルを.gitignoreで除外してください。

- /extension/plugins/Zoho/vendor/zohocrm/php-sdk/src/resources
- /extension/plugins/Zoho/vendor/zohocrm/php-sdk/src/com/zoho/oauth/logger/
