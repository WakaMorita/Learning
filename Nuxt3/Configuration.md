# Nuxtプロジェクト内の構成

## Nuxtアプリケーション作成時
* コンポーネントはapp.vueのみ
* 設定ファイルやフォルダも必要最小限のみ(Nuxt3の特徴)
```
hello-nuxt　                プロジェクトのルートフォルダ
│       
├─.nuxt　                   自動生成されたNuxtアプリケーションが格納されたフォルダ
│       
├─node_modules              パッケージが格納されたフォルダ
│       
├─public                    Webに公開するファイル類を格納するフォルダ
│       
├─server                    エンドポイントAPIサーバ処理を行うファイルを格納するフォルダ
│       
├─tsconfig.json             serverフォルダ内のTypeScriptに関する設定ファイル
│       
├─.gitignore                Git管理対象から除外するファイルの設定ファイル
│       
├─.npmrc                    npmコマンドの設定ファイル
│       
├─app.vue                   メインの単一コンポーネント
│       
├─nuct.config.ts            このNuxtアプリケーションの設定ファイル
│       
├─package-lock.json         npmの依存関係に関する設定ファイル
│       
├─package.json              npmに関する設定ファイル
│       
├─README.md                 ReadMeファイル
│       
└─tsconfig.json             TypeScriptに関する設定ファイル
```

## 最大構成

```
        hello-nuxt　                プロジェクトのルートフォルダ
        │       
        ├─.nuxt　                   自動生成されたNuxtアプリケーションが格納されたフォルダ
        │       
        ├─.output★　               デプロイ用のファイル一式が格納されたフォルダ
        │       
        ├─assets★　                画像やCSSファイルなどのアセット類が格納されたフォルダ
        │       
        ├─components★　            コンポーネントファイルが格納されたフォルダ
        │       
        ├─composables★　           コンポーザブル定義ファイルが格納されたフォルダ
        │       
        ├─layouts★　               レイアウト用のコンポーネントファイルが格納されたフォルダ
        │       
        ├─middleware★　            ミドルウェアに関するファイルが格納されたフォルダ
        │       
        ├─modules★　               独自モジュールが格納されたフォルダ        
        │       
        ├─node_modules              パッケージが格納されたフォルダ
        │       
        ├─pages★　                 ルーティングに必要なコンポーネントファイルが格納されたフォルダ
        │       
        ├─plugins★　               プラグインが格納されたフォルダ        
        │       
        ├─public                    Webに公開するファイル類を格納するフォルダ
        │       
        ├─server                    エンドポイントAPIサーバ処理を行うファイルを格納するフォルダ
        │       
        ├─utils★　                 ヘルパー関数ファイルが格納されたフォルダ
        │       
        ├─.env★　                  環境変数設定ファイル               
        │       
        ├─tsconfig.json             serverフォルダ内のTypeScriptに関する設定ファイル
        │       
        ├─.gitignore                Git管理対象から除外するファイルの設定ファイル
        │       
        ├─.nuxtignore★　            nuxtのビルド対象から除外するファイルの設定ファイル               
        │       
        ├─.npmrc                    npmコマンドの設定ファイル
        │       
        ├─.app.config.ts★　        titleなどこのNuxtアプリケーション利用するデータを定義するファイル
        │       
        ├─app.vue                   メインの単一コンポーネント
        │       
        ├─nuct.config.ts            このNuxtアプリケーションの設定ファイル
        │       
        ├─package-lock.json         npmの依存関係に関する設定ファイル
        │       
        ├─package.json              npmに関する設定ファイル
        │       
        ├─README.md                 ReadMeファイル
        │       
        └─tsconfig.json             TypeScriptに関する設定ファイル
```


<details><summary>参考：</summary>

```rb

```
</details>