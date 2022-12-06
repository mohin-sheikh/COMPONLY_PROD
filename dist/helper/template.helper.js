"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPass = void 0;
let forgot = `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Your Forgot Password</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`;
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