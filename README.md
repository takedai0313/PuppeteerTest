# PuppeteerTest

- ヘッドレスChromeを操作するnodejs用ライブラリ
  - 開発をChrome DevToolsが行っている

## 必要なもの

- nodejs v7.6以上(puppeteer自体は6.4から動くが、簡単に使うためのasync-awaitを使うために)

## (Puppeteerを使ってアサーションテストを行うまでの)準備
- nodejsのバージョン確認 `node --version`
  - 7.6以上ならOK
- (7.6未満なら)nodeのバージョンアップ
  - https://qiita.com/satoyan419/items/56e0b5f35912b9374305 この辺を参考にnodistインストール & nodejsのバージョンアップ(n を使っても勿論よい。好きなものを)
- Puppeteerとテスティングフレームワーク(mocha)、アサーションライブラリ(chai)のインストール
  - 試用ファイルを置く場所をnpm管理下に `npm init`
  - 一式をインストール `npm i puppeteer mocha chai --save-dev`

## (上がうまく動かくなくて)yarnでpuppeteerをインストールするなら
- chocolateyをインストール
  - https://qiita.com/konta220/items/95b40b4647a737cb51aa この辺を参考に
- yarnをインストール
  - `choco install yarn` https://qiita.com/takupang/items/3cc259cdad3be9c6eb3a 参考
- yarnでpuppeteerをインストール `yarn add puppeteer`

## テスト実行
- `npm test` (mocha --timeout 10000が実行される / ブラウザ開くのにmochaのデフォタイムアウト値の2秒を超える事が往々にあるのでタイムアウト値を10秒に変更)
- test/test.js が実行される
- ここでは、普通の入力フォームのチェックを行う

## 参考
puppetterでできる事
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
