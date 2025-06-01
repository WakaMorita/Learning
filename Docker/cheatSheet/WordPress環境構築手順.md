## WordPress環境構築手順

### 概要
このガイドでは、Dockerを使用してWordPress環境を構築する手順を説明します。
MySQLデータベースとWordPressを別々のコンテナで実行し、Dockerネットワークで接続します。

### 重要な注意事項
1. このガイドは開発環境向けの基本設定です。本番環境では以下の追加対策が必要です：
   - すべてのパスワードを強力なものに変更
   - SSL/TLSの設定による通信の暗号化
   - ファイアウォールの適切な設定
   - 定期的なバックアップの実施

2. データの永続化について：
   - MySQLのデータ
   - WordPressのコンテンツ、プラグイン、テーマ
   これらは後述のボリュームマウントで永続化します。

### 環境設定値
以下の設定値を使用します。必要に応じて変更してください。

#### ネットワーク設定
- ネットワーク名: `wordpress000net1`
- 公開ポート: `8085`（ホスト） → `80`（コンテナ）

#### MySQLコンテナ設定
- コンテナ名: `mysql000ex11`
- イメージ名: `mysql`
- データベース名: `wordpress000db`
- ルートパスワード: `myrootpass`
- 作成するユーザー名: `wordpress000kun`
- ユーザーパスワード: `wkunpass`

#### WordPressコンテナ設定
- コンテナ名: `wordpress000ex12`
- イメージ名: `wordpress`

### 1. ボリュームの作成
データを永続化するために、以下のボリュームを作成します：

```bash
# MySQLデータ用のボリューム
docker volume create mysql_data

# WordPress用のボリューム
docker volume create wordpress_data
```

### 2. Dockerネットワークの作成
最初に、MySQLとWordPressのコンテナ間で通信するためのネットワークを作成します。

```bash
docker network create wordpress000net1
```

### 3. MySQLコンテナの作成・起動
MySQLデータベースコンテナを作成し、WordPressで使用する設定を行います。

```bash
docker run \
  --name mysql000ex11 \
  -dit \
  --net=wordpress000net1 \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=myrootpass \
  -e MYSQL_DATABASE=wordpress000db \
  -e MYSQL_USER=wordpress000kun \
  -e MYSQL_PASSWORD=wkunpass \
  mysql \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

<details>
<summary>📝 MySQLコンテナのパラメータ説明</summary>

- `--name`: コンテナ名を指定
- `-dit`: デタッチモードで実行（バックグラウンド実行）
- `--net`: 使用するDockerネットワーク
- `-v`: データの永続化のためのボリュームマウント
- `-e`: 環境変数の設定
  - `MYSQL_ROOT_PASSWORD`: MySQLのroot用パスワード
  - `MYSQL_DATABASE`: 作成するデータベース名
  - `MYSQL_USER`: 作成するデータベースユーザー
  - `MYSQL_PASSWORD`: データベースユーザーのパスワード
- `--character-set-server`: 文字コードの設定（日本語対応）
- `--collation-server`: 照合順序の設定
</details>

### 4. WordPressコンテナの作成・起動
WordPressコンテナを作成し、MySQLコンテナと連携するように設定します。

```bash
docker run \
  --name wordpress000ex12 \
  -dit \
  --net=wordpress000net1 \
  -p 8085:80 \
  -v wordpress_data:/var/www/html \
  -e WORDPRESS_DB_HOST=mysql000ex11 \
  -e WORDPRESS_DB_NAME=wordpress000db \
  -e WORDPRESS_DB_USER=wordpress000kun \
  -e WORDPRESS_DB_PASSWORD=wkunpass \
  wordpress
```

<details>
<summary>📝 WordPressコンテナのパラメータ説明</summary>

- `--name`: コンテナ名を指定
- `-dit`: デタッチモードで実行
- `--net`: MySQLと同じネットワークを指定
- `-p`: ポートマッピング（ホスト:コンテナ）
- `-v`: WordPressのコンテンツを永続化するためのボリュームマウント
- `-e`: 環境変数の設定
  - `WORDPRESS_DB_HOST`: MySQLコンテナ名
  - `WORDPRESS_DB_NAME`: 使用するデータベース名
  - `WORDPRESS_DB_USER`: データベースユーザー
  - `WORDPRESS_DB_PASSWORD`: データベースパスワード
</details>

### 5. 動作確認
1. ブラウザで `http://localhost:8085` にアクセス
2. WordPressの初期設定画面が表示されることを確認
3. 言語を選択し、WordPressのセットアップを完了

### トラブルシューティング

<details>
<summary>🔍 コンテナの状態確認</summary>

```bash
docker ps -a
```
</details>

<details>
<summary>📋 ログの確認</summary>

```bash
# MySQLのログ確認
docker logs mysql000ex11

# WordPressのログ確認
docker logs wordpress000ex12
```
</details>

<details>
<summary>🗑️ コンテナの停止と削除</summary>

```bash
# コンテナの停止
docker stop mysql000ex11 wordpress000ex12

# コンテナの削除
docker rm mysql000ex11 wordpress000ex12

# ネットワークの削除
docker network rm wordpress000net1
```
</details>

### セキュリティに関する推奨事項
1. パスワードの管理
   - 本番環境では強力なパスワードを使用
   - パスワードは環境変数やDocker Secretsで管理

2. ネットワークセキュリティ
   - 必要なポートのみを公開
   - プロキシサーバー（例：Nginx）の使用を検討
   - SSL/TLSの設定

3. 定期的なメンテナンス
   - WordPressとプラグインの更新
   - セキュリティスキャンの実施
   - バックアップの作成と検証

4. コンテナのセキュリティ
   - 最新のイメージの使用
   - rootユーザーでの実行を避ける
   - リソース制限の設定

### バックアップ方法
```bash
# MySQLデータのバックアップ
docker exec mysql000ex11 mysqldump -u root -p wordpress000db > backup.sql

# WordPressファイルのバックアップ
docker cp wordpress000ex12:/var/www/html ./wordpress-backup
```

参考文献：Docker&Kubernetesのきほんのきほん Chapter5