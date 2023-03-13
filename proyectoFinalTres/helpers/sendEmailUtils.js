import * as dotenv from "dotenv";
dotenv.config();
import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.SMTP_SENDER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmailRegistration(html) {
  const mailOptions = {
    from: "Ecommerce Preentrega",
    to: process.env.ADMIN_EMAIL,
    subject: "Nuevo Registro",
    html: html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

export async function sendEmailOrder(html, userName, userEmail) {
  const mailOptions = {
    from: "Ecommerce Preentrega",
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo pedido de ${userName} - ${userEmail}`,
    html: html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}
