## Redmine環境構築手順

### 概要
このガイドでは、Dockerを使用してRedmine環境を構築する手順を説明します。
MySQLデータベースとRedmineを別々のコンテナで実行し、Dockerネットワークで接続します。

### 重要な注意事項
1. このガイドは開発環境向けの基本設定です。本番環境では以下の追加対策が必要です：
   - すべてのパスワードを強力なものに変更
   - SSL/TLSの設定による通信の暗号化
   - ファイアウォールの適切な設定
   - 定期的なバックアップの実施

2. データの永続化について：
   - MySQLのデータ
   - Redmineのファイル（添付ファイル等）
   - Redmineのプラグイン
   これらは後述のボリュームマウントで永続化します。

### 環境設定値
以下の設定値を使用します。必要に応じて変更してください。

#### ネットワーク設定
- ネットワーク名: `redmine000net2`
- 公開ポート: `8086`（ホスト） → `3000`（コンテナ）

#### MySQLコンテナ設定
- コンテナ名: `mysql000ex13`
- イメージ名: `mysql`
- データベース名: `redmine000db`
- ルートパスワード: `myrootpass`
- 作成するユーザー名: `redmine000kun`
- ユーザーパスワード: `rkunpass`

#### Redmineコンテナ設定
- コンテナ名: `redmine000ex14`
- イメージ名: `redmine`

### 1. ボリュームの作成
データを永続化するために、以下のボリュームを作成します：

```bash
# MySQLデータ用のボリューム
docker volume create mysql_data_redmine

# Redmineのファイル用のボリューム
docker volume create redmine_files

# Redmineのプラグイン用のボリューム
docker volume create redmine_plugins
```

### 2. Dockerネットワークの作成
最初に、MySQLとRedmineのコンテナ間で通信するためのネットワークを作成します。

```bash
docker network create redmine000net2
```

### 3. MySQLコンテナの作成・起動
MySQLデータベースコンテナを作成し、Redmineで使用する設定を行います。

```bash
docker run \
  --name mysql000ex13 \
  -dit \
  --net=redmine000net2 \
  -v mysql_data_redmine:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=myrootpass \
  -e MYSQL_DATABASE=redmine000db \
  -e MYSQL_USER=redmine000kun \
  -e MYSQL_PASSWORD=rkunpass \
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

### 4. Redmineコンテナの作成・起動
Redmineコンテナを作成し、MySQLコンテナと連携するように設定します。

```bash
docker run \
  --name redmine000ex14 \
  -dit \
  --net=redmine000net2 \
  -p 8086:3000 \
  -v redmine_files:/usr/src/redmine/files \
  -v redmine_plugins:/usr/src/redmine/plugins \
  --memory="1g" \
  --cpus="2" \
  -e REDMINE_DB_MYSQL=mysql000ex13 \
  -e REDMINE_DB_DATABASE=redmine000db \
  -e REDMINE_DB_USERNAME=redmine000kun \
  -e REDMINE_DB_PASSWORD=rkunpass \
  redmine
```

<details>
<summary>📝 Redmineコンテナのパラメータ説明</summary>

- `--name`: コンテナ名を指定
- `-dit`: デタッチモードで実行
- `--net`: MySQLと同じネットワークを指定
- `-p`: ポートマッピング（ホスト:コンテナ）
- `-v`: ファイルとプラグインを永続化するためのボリュームマウント
- `--memory`: メモリ使用量の制限
- `--cpus`: CPU使用量の制限
- `-e`: 環境変数の設定
  - `REDMINE_DB_MYSQL`: MySQLコンテナ名
  - `REDMINE_DB_DATABASE`: 使用するデータベース名
  - `REDMINE_DB_USERNAME`: データベースユーザー
  - `REDMINE_DB_PASSWORD`: データベースパスワード
</details>

### 5. 動作確認
1. ブラウザで `http://localhost:8086` にアクセス
2. Redmineの初期画面が表示されることを確認
3. デフォルトの管理者アカウントでログイン
   - ユーザー名: `admin`
   - パスワード: `admin`
4. 管理者パスワードを変更

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
docker logs mysql000ex13

# Redmineのログ確認
docker logs redmine000ex14
```
</details>

<details>
<summary>🗑️ コンテナの停止と削除</summary>

```bash
# コンテナの停止
docker stop mysql000ex13 redmine000ex14

# コンテナの削除
docker rm mysql000ex13 redmine000ex14

# ネットワークの削除
docker network rm redmine000net2
```
</details>

### セキュリティに関する推奨事項
1. パスワードの管理
   - 本番環境では強力なパスワードを使用
   - パスワードは環境変数やDocker Secretsで管理
   - 初期管理者パスワードの即時変更

2. ネットワークセキュリティ
   - 必要なポートのみを公開
   - プロキシサーバー（例：Nginx）の使用を検討
   - SSL/TLSの設定

3. 定期的なメンテナンス
   - Redmineとプラグインの更新
   - セキュリティスキャンの実施
   - バックアップの作成と検証

4. コンテナのセキュリティ
   - 最新のイメージの使用
   - リソース制限の設定（メモリ、CPU）
   - rootユーザーでの実行を避ける

### バックアップ方法
```bash
# MySQLデータのバックアップ
docker exec mysql000ex13 mysqldump -u root -p redmine000db > backup.sql

# Redmineファイルのバックアップ
docker cp redmine000ex14:/usr/src/redmine/files ./redmine-files-backup
docker cp redmine000ex14:/usr/src/redmine/plugins ./redmine-plugins-backup
```

参考文献：Docker&Kubernetesのきほんのきほん Chapter5