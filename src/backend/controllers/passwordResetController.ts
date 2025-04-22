import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import PasswordReset from "@/app/components/templates/PasswordReset";
import { EmailHistory } from "@/backend/models";
import { IPasswordReset } from "@/types/IPasswordReset";
export default async function sendPasswordReset(data: IPasswordReset, user: string) {
  try {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);

    const { recipients, name, resetLink } = data;

    if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT) {
      return {
        response: {
          success: false,
          message: "Missing SMTP credentials",
        },
        status: 500,
      };
    }

    const passwordReset = PasswordReset({ name, resetLink });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    const passwordResetHtml = await render(passwordReset);

    const mailOptions = {
      from: `"Email Sender" <${SMTP_USER}>`,
      to: recipients.join(", "),
      subject: "Password Reset Request",
      html: passwordResetHtml,
    };

    await transporter.sendMail(mailOptions);

    const emailHistory = new EmailHistory({
      user,
      type: "passwordReset",
      recipients,
      name,
      payload: {
        resetLink,
      },
    });

    await emailHistory.save();

    return {
      message: "Email sent successfully!",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
