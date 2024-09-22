const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aminhamrouni82@gmail.com",
    pass: "Amin1991*",
  },
});
const mailOptions = {
  from: "aminhamrouni82@gmail.com", // sender address
  to: email , // list of receivers
  subject: "Subscribe Success", // Subject line
  html: "<p>Your html here</p>", // plain text body
};
transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});
