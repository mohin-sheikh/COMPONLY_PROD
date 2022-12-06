"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPass = exports.welcome = void 0;
let forgot = `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Your Forgot Password</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`;
let welcomeTemplate = `Hi <b>#var</b>,
<br>Welcome to Componly.co – we’re excited to have you on board and we’d love to say thank you on behalf of our whole company for chosing us. 
<br>We believe our service will help you service benefits.
<br>To ensure you gain the very best out of our service
<br><br>Have any questions or need more information? Just shoot us an email! 
<br>We’re always here to help. Feel free to hit us up on https://componly.co
<br><br>Thank you for choosing us!
<br>Take care,`;
const welcome = (name) => {
    const obj = {
        name: name.toUpperCase(),
    };
    for (const value in obj) {
        welcomeTemplate = welcomeTemplate.replace('#var', obj[value]);
    }
    return welcomeTemplate;
};
exports.welcome = welcome;
const forgotPass = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp,
    };
    for (const value in obj) {
        forgot = forgot.replace('#var', obj[value]);
    }
    return forgot;
};
exports.forgotPass = forgotPass;
//# sourceMappingURL=template.helper.js.map