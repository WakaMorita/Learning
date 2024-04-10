# npmとは

* npm : Node Package Manager
* Node.jsを管理するためのツール
* Node.jsインストール時にnpmも同時にインストールされる


# npxとは
* npx : Node Package Executer
* ローカルにインストール（npm i ~）されていない機能を一時的にインストールして実行する


<details><summary>参考：サイト</summary>

```rb
https://npm.command-ref.com/basic-cmd.html
https://qiita.com/standard-software/items/2ac49a409688733c90e7
https://qiita.com/sivertigo/items/622550c5d8ec991e59a6
https://qiita.com/vagary/items/2e8953d218a309b46144
```
</details>

##　よく使うコマンド
* npm -v
    * 使用しているnpmのバージョンを表示する

* npx nuxi init プロジェクト名
    * プロジェクトを新規作成する

* npm install
    * パッケージインストール

* npm run dev
    * 開発用サーバの起動

* npm run dev -- -o (npx nuxi dev -o)
    * 開発用サーバの起動(ブラウザ起動有)

<details><summary>参考：エイリアスと--</summary>

```rb
エイリアス ： Commandの別名
例　-open, -o
    npx nuxi dev, npm run dev

npm run dev -- -o の　--　はエイリアスの本体にオプションを渡す場合に使われる
* -oオプションはnpx nuxi devにしか対応していないのでエイリアスのnpm run devを利用する際はオプションを渡す--が利用される
```
</details>    
