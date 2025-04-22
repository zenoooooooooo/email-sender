import InterviewInvitation from "@/app/components/templates/InterviewInvitation";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { EmailHistory } from "@/backend/models";
import { IInterviewInvitation } from "@/types/IInterviewInvitation";
export default async function sendInterviewInvitation(
  data: IInterviewInvitation,
  user: string
) {
  try {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);

    const {
      recipients,
      name,
      position,
      company,
      companyDescription,
      interviewDate,
      interviewTime,
      interviewLocation,
      interviewNotes,
      contactMethod,
      contactLink,
      departmentName,
      logoLink,
      contactPhone,
      contactEmail,
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

    const interviewInvitation = InterviewInvitation({
      name,
      position,
      company,
      companyDescription,
      interviewDate,
      interviewTime,
      interviewLocation,
      interviewNotes,
      contactMethod,
      contactLink,
      departmentName,
      logoLink,
      contactPhone,
      contactEmail,
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

    const interviewInvitationHtml = await render(interviewInvitation);

    const mailOptions = {
      from: `"Email Sender" <${SMTP_HOST}>`,
      to: recipients.join(", "),
      subject: `Interview Invitation - ${position} at ${company}`,
      html: interviewInvitationHtml,
    };

    await transporter.sendMail(mailOptions);

    const emailHistory = new EmailHistory({
      user,
      type: "interviewInvitation",
      recipients,
      name,
      payload: {
        position,
        company,
        companyDescription,
        interviewDate,
        interviewTime,
        interviewLocation,
        interviewNotes,
        contactMethod,
        contactLink,
        departmentName,
        logoLink,
        contactPhone,
        contactEmail,
      },
    });

    await emailHistory.save();

    return {
      message: "Email sent successfully",
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
