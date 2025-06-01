# Docker Cheatsheet
## WordPress環境構築

### MySQLコンテナの作成・起動

MySQLデータベースコンテナを作成し、WordPressで使用する設定を行います。

```bash
docker run \
  --name mysql000ex11 \
  -dit \
  --net=wordpress000net1 \
  -e MYSQL_ROOT_PASSWORD=myrootpass \
  -e MYSQL_DATABASE=wordpress000db \
  -e MYSQL_USER=wordpress000kun \
  -e MYSQL_PASSWORD=wkunpass \
  mysql \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

### WordPressコンテナの作成・起動

WordPressコンテナを作成し、先ほど作成したMySQLコンテナと連携するように設定します。

```bash
docker run \
  --name wordpress000ex12 \
  -dit \
  --net=wordpress000net1 \
  -p 8085:80 \
  -e WORDPRESS_DB_HOST=mysql000ex11 \
  -e WORDPRESS_DB_NAME=wordpress000db \
  -e WORDPRESS_DB_USER=wordpress000kun \
  -e WORDPRESS_DB_PASSWORD=wkunpass \
  wordpress
```