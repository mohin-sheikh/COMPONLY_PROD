// TODO : this is just a format will change as per requirement.
let forgot = `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Your Forgot Password</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`;

let welcomeTemplate = `Hi <b>#var</b>,
<br>Welcome to Componly.co – we’re excited to have you on board and we’d love to say thank you on behalf of our whole company for chosing us. 
<br>We believe our service will help you service benefits. To ensure you gain the very best out of our service
<br>Have any questions or need more information? Just shoot us an email, We’re always here to help. 
<br>Feel free to hit us up on https://componly.co
<br><br>Take care,`;

export const welcome = (name: string) => {
  const obj = {
    name: name.toUpperCase(),
  };
  for (const value in obj) {
    welcomeTemplate = welcomeTemplate.replace('#var', obj[value]);
  }
  return welcomeTemplate;
};

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
