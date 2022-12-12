import * as mailgun from 'mailgun-js';

export async function sendMail(email: string, subject: string, text: any) {
  const mg = mailgun({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
    host: process.env.MAILGUN_HOST,
  });

  const data = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: subject,
    html: text,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
    return;
  });
}
