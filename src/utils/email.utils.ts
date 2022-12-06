import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

export async function mail(to: string, subject: string, text: string) {
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL, // need to update this line
    to: to,
    subject: subject,
    text: text,
    html: text,
  });
}
