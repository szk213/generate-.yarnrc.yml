# generate-.yarnrc.yml

package-lock.jsonからyarn2のpackageExtensionsを生成する

既存プロジェクトがyarn2で動かないのでとりあえず動かすために作成

package-lock.jsonの`dependencies`(devがtrueでないやつ)のrequiresをすべてpackageExtensionsに定義する

## 実行

1. targetフォルダに`package-lock.json`を配置
2. `yarn start`
