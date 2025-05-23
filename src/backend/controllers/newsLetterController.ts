import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import NewsLetter from "@/app/components/templates/NewsLetter";
import { EmailHistory } from "@/backend/models";
import { INewsLetter } from "@/types/INewsLetter";
export default async function sendNewsLetter(data: INewsLetter, user: string) {
  try {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);

    const {
      recipients,
      name,
      month,
      headline,
      content,
      unsubscribeLink,
      author,
    } = data;

    if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT) {
      return {
        response: {
          success: false,
          message: "Missing SMTP credentials",
        },
        status: 500,
      };
    }

    const newsLetter = NewsLetter({
      name,
      month,
      headline,
      content,
      unsubscribeLink,
      author,
    });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    const newsLetterHtml = await render(newsLetter);

    const mailOptions = {
      from: `"Email Sender" <${SMTP_HOST}>`,
      to: recipients.join(", "),
      subject: `Monthly Newsletter - ${month}`,
      html: newsLetterHtml,
    };

    await transporter.sendMail(mailOptions);

    const emailHistory = new EmailHistory({
      user,
      type: "newsLetter",
      recipients,
      name,
      payload: {
        month,
        headline,
        content,
        unsubscribeLink,
        author,
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
      response: {
        success: false,
        message: "Error sending email",
      },
      status: 500,
    };
  }
}
