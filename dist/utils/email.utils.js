"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const nodemailer_1 = require("nodemailer");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});
async function mail(to, subject, text) {
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        text: text,
        html: text,
    });
}
exports.mail = mail;
//# sourceMappingURL=email.utils.js.map