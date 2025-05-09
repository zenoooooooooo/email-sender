import {
  Button,
  Container,
  Tailwind,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

import { IInterviewInvitation } from "@/types/IInterviewInvitation";

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
  contactPhone,
  contactEmail,
}: Omit<IInterviewInvitation, "recipients">) {
  return (
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
      <Section className="bg-background  bg-white flex items-center rounded-md justify-center p-6">
        <Container className="max-w-auto rounded-xl p-8 text-grayDark font-sans text-base">

          <h1 className="text-2xl font-semibold mb-2">Interview Invitation</h1>
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
              href={
                contactMethod === "email"
                  ? `mailto:${contactLink}`
                  : contactMethod === "phone"
                    ? `tel:${contactLink}`
                    : contactLink
              }
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
            </a>{" "}
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
  );
}
