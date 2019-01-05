# vue.jsとfirebase functionsによる問い合わせフォーム作成デモ

## 出来ること
firebase hostingでvue.js製のSPAをレンダリングして、問い合わせフォーム内でFirebase functionsを呼び、メール通知を行う

### functionsでの環境変数の設定
```
$ firebase functions:config:set gmail.email="メールサーバーとして使うgmailのユーザーID" gmail.password="メールサーバーとして使うgmailのパスワード" admin.email="問い合わせ内容を送信する管理者アドレス" 
```


