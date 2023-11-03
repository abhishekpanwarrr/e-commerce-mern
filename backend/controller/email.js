import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = asyncHandler(async (data, req, res) => {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <abc@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  console.log("Message sent: %s", info.messageId);
});
