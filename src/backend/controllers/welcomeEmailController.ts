import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import WelcomeEmail from "@/app/components/templates/WelcomeEmail";
async function sendWelcomeEmail(data: IWelcomeEmail) {
  try {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);

    const recipients = data.recipients;
    const name = data.name;
    const email = data.email;
    const loginLink = data.loginLink;
    
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
      from: `"Email Sender" <${email}>`,
      to: recipients.join(", "),
      subject: "Welcome to our platform!",
      html: welcomeEmailHtml,
    };

    await transporter.sendMail(mailOptions);

    return {
      response: { success: true, message: "Email sent successfully!" },
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

export default sendWelcomeEmail;
