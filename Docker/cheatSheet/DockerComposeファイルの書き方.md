## Docker Composeファイルの書き方

## 目次
1. [概要](#概要)
2. [docker-compose.yml基本構造](#docker-composeyml基本構造)
3. [書式](#書式)
4. [定義ファイル（YAML形式）の記述ルールまとめ](#定義ファイルyaml形式の記述ルールまとめ)
5. [定義ファイルの項目](#定義ファイルの項目)
6. [よく使われる定義内容](#よく使われる定義内容)
7. [restartの設定値](#restartの設定値)
8. [実践例](#実践例)
9. [トラブルシューティング](#トラブルシューティング)
10. [ベストプラクティス](#ベストプラクティス)

### 概要
このガイドでは、Docker Composeファイル（docker-compose.yml）の書き方について説明します。
Docker Composeを使用することで、複数のコンテナを定義し、実行する環境を一元管理できます。

### docker-compose.yml基本構造
```yaml
version: "3.8"  # Composeファイルのバージョン

services:       # コンテナの定義
  service1:     # サービス名（コンテナ名）
    image: ...  # 使用するイメージ
    
  service2:     # 2つ目のサービス
    build: ...  # Dockerfileからビルド

volumes:        # ボリュームの定義
  volume1:      # ボリューム名
  
networks:       # ネットワークの定義
  network1:     # ネットワーク名
```

### 書式
Docker Composeファイルは以下の階層構造で記述します：

1. 大項目（services, volumes, networks）
2. 名前の追加（サービス名、ボリューム名、ネットワーク名）
3. 設定（各種パラメータの設定）

### 定義ファイル（YAML形式）の記述ルールまとめ
1. インデント
   - スペース2個でインデント
   - タブは使用不可

2. リスト記法
   ```yaml
   ports:
     - "8080:80"
     - "443:443"
   ```

3. マッピング記法
   ```yaml
   environment:
     DB_HOST: db
     DB_USER: wordpress
   ```

4. 複数行の文字列
   ```yaml
   command: |
     sh -c "echo 'Starting...' &&
     python app.py"
   ```

5. コメント
   ```yaml
   # 行末までコメント
   services:
     web:
       image: nginx:latest  # インラインコメント
   ```

6. 文字列
   ```yaml
   # クォートなし（特殊文字を含まない場合）
   name: myapp
   
   # シングルクォート（特殊文字をそのまま扱う）
   message: 'Hello ${USER}'
   
   # ダブルクォート（変数展開や特殊文字のエスケープが可能）
   greeting: "Hello ${USER}"
   ```

### 定義ファイルの項目

#### services
コンテナの設定を定義します。主な設定項目：

1. image: 使用するDockerイメージ
   ```yaml
   services:
     web:
       image: nginx:latest
   ```

2. build: Dockerfileからのビルド設定
   ```yaml
   services:
     app:
       build: 
         context: ./app
         dockerfile: Dockerfile
   ```

3. ports: ポートマッピング
   ```yaml
   services:
     web:
       ports:
         - "8080:80"
   ```

4. volumes: ボリュームマウント
   ```yaml
   services:
     db:
       volumes:
         - db_data:/var/lib/mysql
         - ./init.sql:/docker-entrypoint-initdb.d/init.sql
   ```

#### networks
コンテナ間のネットワークを定義します：

```yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # 外部ネットワークとの接続を遮断
```

#### volumes
永続化するデータのボリュームを定義します：

```yaml
volumes:
  db_data:    # 名前付きボリューム
  cache:
    driver: local
```

### よく使われる定義内容

1. イメージの指定
   ```yaml
   services:
     web:
       image: nginx:latest    # Docker Hubから取得
       # または
       build: ./dockerfile    # Dockerfileからビルド
   ```

2. ネットワーク設定
   ```yaml
   services:
     web:
       networks:
         - frontend    # フロントエンド用ネットワーク
         - backend     # バックエンド用ネットワーク
    networks:
      frontend:
        driver: bridge
      backend:
        internal: true    # 外部非公開
    ```

3. ボリューム設定
   ```yaml
   services:
     db:
       volumes:
         - db_data:/var/lib/mysql    # 名前付きボリューム
         - ./data:/data              # バインドマウント
    volumes:
      db_data:    # ボリュームの定義
    ```

4. ポート設定
   ```yaml
   services:
     web:
       ports:
         - "8080:80"     # ホスト:コンテナ
         - "443:443"     # HTTPS用
   ```

5. 環境変数の設定
   ```yaml
   services:
     web:
       environment:
         - NODE_ENV=production
         - API_KEY=secret
       # または
       env_file:
         - .env     # 環境変数ファイル
   ```

6. 依存関係の定義
   ```yaml
   services:
     web:
       depends_on:
         - db
         - redis
   ```

7. 再起動ポリシー
   ```yaml
   services:
     web:
       restart: always    # 常に再起動
   ```

8. コンテナ名の指定
   ```yaml
   services:
     web:
       container_name: my-web-app
   ```

9. コマンドの実行
   ```yaml
   services:
     app:
       command: python app.py
   ```

### restartの設定値
再起動ポリシーを定義します：

| 設定値 | 説明 |
|--------|------|
| no | 自動再起動しない |
| always | 常に再起動 |
| on-failure | エラー時のみ再起動 |
| unless-stopped | 手動で停止した場合を除き再起動 |

```yaml
services:
  web:
    restart: always
```

### 実践例

#### WordPressとMySQLの構成例
```yaml
version: '3.8'

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress_data:/var/www/html

volumes:
  db_data: {}
  wordpress_data: {}
```

### トラブルシューティング

<details>
<summary>🔍 よくあるエラーと解決方法</summary>

1. ポートの競合
   - 使用中のポートの確認
   - ポート番号の変更

2. ボリュームのパーミッション
   - 所有者とパーミッションの確認
   - SELinuxの設定確認

3. ネットワーク接続の問題
   - ネットワーク設定の確認
   - コンテナ名の解決確認
</details>

### ベストプラクティス

1. **バージョン管理**
   - Composeファイルのバージョン指定
   - イメージタグの明示的な指定

2. **環境変数の活用**
   - 機密情報は.envファイルで管理
   - 環境固有の設定を分離

3. **ボリューム管理**
   - 永続化が必要なデータの特定
   - 適切なマウントポイントの選択

4. **ネットワーク設定**
   - 適切なネットワーク分離
   - セキュリティグループの設定

5. **可読性とメンテナンス**
   - 適切なサービス名の使用
   - コメントによるドキュメント化

### 参考文献
1. Docker&Kubernetesのきほんのきほん
2. [Docker Compose file reference](https://docs.docker.com/reference/compose-file/) - Docker公式ドキュメント
