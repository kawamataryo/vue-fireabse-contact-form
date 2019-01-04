const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート
const adminContents = data => {
  return `以下内容でホームページよりお問い合わせを受けました。

お名前：
${data.name}

メールアドレス：
${data.email}

内容：
${data.contents}
`;
};

// ユーザーへの自動返信用のメールテンプレート
const userContents = data => {
  return `${data.name} 様

お問い合わせありがとうございます。
このメールは自動返信メールです。

以下内容で受け付けました。

お名前：
${data.name}

メールアドレス：
${data.email}

内容：
${data.contents}

内容を確認次第ご返信差し上げます。
よろしくお願いいたします。
`;
};

exports.mailer = functions.https.onCall((data, context) => {
  cors(data, context, () => {
    // メール設定
    let adminMail = {
      from: gmailEmail,
      to: adminEmail,
      subject: "ホームページお問い合わせ",
      text: adminContents(data)
    };
    let userMail = {
      from: gmailEmail,
      to: data.email,
      subject: "お問い合わせありがとうございます [山本眼科]",
      text: userContents(data)
    };

    // 管理者へのメール送信
    mailTransport.sendMail(adminMail, (err, info) => {
      if (err) {
        return console.error(`admin send failed. ${err}`);
      }
      // ユーザーへの自動返信メール送信
      mailTransport.sendMail(userMail, (err, info) => {
        if (err) {
          return console.error(`user send failed. ${err}`);
        }
        return console.log("admin and user success");
      });
    });
  });
});
