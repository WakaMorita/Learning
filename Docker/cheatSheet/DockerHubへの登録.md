## DockerHubへのイメージ登録手順

## 目次
1. [概要](#概要)
2. [重要な注意事項](#重要な注意事項)
3. [DockerHubの基礎知識](#dockerhubの基礎知識)
   - [主要な概念](#1-主要な概念)
   - [タグの命名規則](#2-タグの命名規則)
   - [タグ名の例](#タグ名の例)
4. [イメージの登録手順](#イメージの登録手順)
   - [DockerHubアカウントの準備](#1-dockerhubアカウントの準備)
   - [イメージのタグ付け](#2-イメージのタグ付け)
   - [イメージのアップロード](#3-イメージのアップロード)
   - [動作確認](#4-動作確認)
5. [プライベートレジストリの構築](#プライベートレジストリの構築)
   - [セキュアなレジストリの作成](#1-セキュアなレジストリの作成)
   - [プライベートレジストリへの登録](#2-プライベートレジストリへの登録)
   - [プライベートレジストリの管理](#3-プライベートレジストリの管理)
6. [トラブルシューティング](#トラブルシューティング)
7. [セキュリティに関する推奨事項](#セキュリティに関する推奨事項)
8. [ベストプラクティス](#ベストプラクティス)

### 概要
このガイドでは、DockerイメージをDockerHubに登録し、共有するための手順について説明します。
また、プライベートレジストリの作成方法についても解説します。

### 重要な注意事項
1. イメージの公開に関する考慮点：
   - 機密情報の有無の確認
   - ライセンスの確認
   - イメージサイズの最適化
2. セキュリティ上の注意：
   - アクセストークンの適切な管理
   - 認証情報の安全な保管
   - 定期的なパスワード更新

### DockerHubの基礎知識

#### 1. 主要な概念
- **レジストリ**：イメージを保管・共有するサービス
- **リポジトリ**：イメージを格納する場所
- **タグ**：イメージのバージョンを識別する名前

#### 2. タグの命名規則
```bash
# DockerHubのタグ形式
username/repository:tag

# プライベートレジストリのタグ形式
registry-host:port/username/repository:tag
```

#### タグ名の例
| 種類 | 説明 | タグ名の例 |
|------|------|------------|
| ローカルレジストリ | 自分のPCに作ったレジストリ<br>リポジトリ名：`nyapachi`<br>バージョン：`13` | `localhost:5000/nyapachi:13` |
| プライベートレジストリ | ドメイン名：`zoozoo.coomm`<br>リポジトリ名：`nyapachi`<br>バージョン：`13` | `zoozoo.coomm/nyapachi:13` |
| DockerHub | ユーザーID：`zoozoousagi`<br>リポジトリ名：`nyapachi`<br>バージョン：`13` | `zoozoousagi/nyapachi:13` |


### イメージの登録手順

#### 1. DockerHubアカウントの準備
```bash
# DockerHubへのログイン（アクセストークンを使用する場合）
$env:DOCKER_TOKEN = "your-access-token"
echo $env:DOCKER_TOKEN | docker login -u your-username --password-stdin

# または通常のログイン（対話式）
docker login
```

#### 2. イメージのタグ付け

##### バージョン管理のベストプラクティス
- セマンティックバージョニング（`major.minor.patch`）の使用
- `latest`タグの適切な管理
- 開発段階に応じたタグ（`dev`, `staging`, `prod`など）

```bash
# 開発用タグの付与
docker tag httpd_custom username/my-httpd:1.0.0-dev

# 本番用タグの付与
docker tag httpd_custom username/my-httpd:1.0.0
docker tag httpd_custom username/my-httpd:latest
```

#### 3. イメージのアップロード
```bash
# イメージのプッシュ
docker push username/my-httpd:1.0.0
docker push username/my-httpd:latest

# プッシュされたイメージの確認
docker search username/my-httpd
```

#### 4. 動作確認
```bash
# イメージの削除（ローカル）
docker rmi username/my-httpd:1.0.0

# イメージのプル
docker pull username/my-httpd:1.0.0

# コンテナ起動テスト
docker run -d --name test-httpd -p 8080:80 username/my-httpd:1.0.0

# 起動確認
docker ps
Start-Process "http://localhost:8080"
```

### プライベートレジストリの構築

#### 1. セキュアなレジストリの作成
```bash
# 証明書と認証情報のディレクトリ作成
New-Item -Path "C:\registry" -ItemType Directory
New-Item -Path "C:\registry\auth" -ItemType Directory
New-Item -Path "C:\registry\certs" -ItemType Directory

# Basic認証の設定
docker run --entrypoint htpasswd registry:2 -Bbn username password > C:\registry\auth\htpasswd

# レジストリコンテナの起動（Basic認証付き）
docker run -d `
    -p 5000:5000 `
    --restart=always `
    --name registry `
    -v C:\registry\auth:/auth `
    -e "REGISTRY_AUTH=htpasswd" `
    -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" `
    -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" `
    registry:2

# 動作確認
docker ps
```

#### 2. プライベートレジストリへの登録
```bash
# レジストリへのログイン
docker login localhost:5000

# ローカルイメージにタグ付け
docker tag httpd_custom localhost:5000/my-httpd:1.0

# プライベートレジストリへプッシュ
docker push localhost:5000/my-httpd:1.0

# レジストリの内容確認
Invoke-WebRequest -Uri "http://localhost:5000/v2/_catalog" | Select-Object -ExpandProperty Content
```

#### 3. プライベートレジストリの管理
```bash
# イメージの一覧表示
curl -X GET http://localhost:5000/v2/_catalog

# タグの一覧表示
curl -X GET http://localhost:5000/v2/my-httpd/tags/list

# 古いイメージの削除
docker exec registry bin/registry garbage-collect /etc/docker/registry/config.yml
```

### トラブルシューティング

<details>
<summary>🔍 よくあるエラーと解決方法</summary>

1. 認証エラー
   - DockerHubログインの確認
   - 認証情報の再設定
   - パーミッションの確認

2. プッシュエラー
   - ネットワーク接続の確認
   - イメージ名とタグの形式確認
   - ディスク容量の確認

3. レジストリ接続エラー
   - ポート開放の確認
   - SSL/TLS設定の確認
   - ファイアウォール設定の確認
</details>

### セキュリティに関する推奨事項
1. アクセス制御
   - 適切な認証設定
   - 最小権限の原則
   - アクセスログの監視

2. イメージのセキュリティ
   - 脆弱性スキャンの実施
   - 機密情報の除去
   - 署名と検証の実施

### ベストプラクティス
1. **イメージ管理**
   - 意味のあるタグ付け
   - 定期的なクリーンアップ
   - バージョン管理の徹底

2. **ドキュメント化**
   - README.mdの作成
   - 依存関係の明記
   - 使用方法の説明

3. **自動化**
   - CIパイプラインの構築
   - 自動ビルドの設定
   - 自動テストの実施

参考文献：Docker&Kubernetesのきほんのきほん