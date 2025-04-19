import {
  Button,
  Container,
  Html,
  Tailwind,
  Text,
  Section,
  Img,
} from "@react-email/components";
import * as React from "react";

export default function InterviewInvitation({
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
}: Omit<IInterviewInvitation, "recipients">) {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#1D4ED8",
                grayDark: "#1F2937",
                grayLight: "#6B7280",
                background: "#F9FAFB",
              },
              fontFamily: {
                sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <Section className="bg-background min-h-screen flex items-center justify-center py-10 px-4">
          <Container className="max-w-2xl bg-white rounded-xl shadow-lg p-8 text-grayDark font-sans text-base">
            {logoLink && (
              <div className="text-center mb-6">
                <Img
                  src={logoLink}
                  alt={`${company} logo`}
                  className="mx-auto h-12"
                />
              </div>
            )}

            <h1 className="text-2xl font-semibold mb-2">
              Interview Invitation
            </h1>
            <Text className="text-grayLight mb-4">
              Dear <strong>{name}</strong>,
            </Text>

            <Text className="mb-4 text-grayLight">
              We are pleased to invite you for an interview for the position of
              <strong> {position}</strong> at <strong>{company}</strong>, under
              the <strong>{departmentName}</strong> department.
            </Text>

            <Text className="mb-4 text-grayLight">
              <em>{companyDescription}</em>
            </Text>

            <Text className="mb-4">
              <strong>Interview Details:</strong>
              <br />
              📅 <strong>Date:</strong> {interviewDate}
              <br />⏰ <strong>Time:</strong> {interviewTime}
              <br />
              📍 <strong>Location:</strong> {interviewLocation}
            </Text>

            {interviewNotes && (
              <Text className="mb-4">
                <strong>Additional Notes:</strong> {interviewNotes}
              </Text>
            )}

            <div className="text-center my-6">
              <Button
                href={contactLink}
                className="bg-brand hover:opacity-90 px-6 py-3 font-medium text-white text-sm rounded-md transition duration-300"
              >
                {contactMethod === "email"
                  ? "Reply via Email"
                  : contactMethod === "phone"
                    ? "Call Us"
                    : "Contact Us"}
              </Button>
            </div>

            <Text className="text-sm text-grayLight">
              If you have any questions, feel free to contact us at{" "}
              <a href={`mailto:${contactEmail}`} className="text-brand">
                {contactEmail}
              </a>
              or call us at{" "}
              <a href={`tel:${contactPhone}`} className="text-brand">
                {contactPhone}
              </a>
              .
            </Text>

            <Text className="text-xs text-gray-400 mt-6">
              This is an automated message from {company}. Please do not reply
              directly to this email.
            </Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
