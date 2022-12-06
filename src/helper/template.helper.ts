// TODO : this is just a format will change is as per requirement.
let forgot = `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Your Forgot Password</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`;

export const forgotPass = (name: string, otp: string) => {
  const obj = {
    name: name.toUpperCase(),
    otp,
  };
  for (const value in obj) {
    forgot = forgot.replace('#var', obj[value]);
  }
  return forgot;
};
