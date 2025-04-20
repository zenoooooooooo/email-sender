import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import WelcomeEmail from "@/app/components/templates/WelcomeEmail";
import { EmailHistory } from "@/backend/models";

export default async function sendWelcomeEmail(data: IWelcomeEmail) {
  try {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);

    const { recipients, name, email, loginLink } = data;

    if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT) {
      return {
        response: {
          success: false,
          message: "Missing SMTP credentials",
        },
        status: 500,
      };
    }

    const welcomeEmail = WelcomeEmail({ name, email, loginLink });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    const welcomeEmailHtml = await render(welcomeEmail);

    const mailOptions = {
      from: `"Email Sender" <${SMTP_HOST}>`,
      to: recipients.join(", "),
      subject: "Welcome to our platform!",
      html: welcomeEmailHtml,
    };

    await transporter.sendMail(mailOptions);

    const emailHistory = new EmailHistory({
      type: "welcomeEmail",
      recipients,
      name,
      payload: {
        loginLink,
        email,
      },
    });

    await emailHistory.save();

    return {
      message: "Email sent successfully!",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
