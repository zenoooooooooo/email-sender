import { IPasswordReset } from "@/types/IPasswordReset";
import {
  Tailwind,
  Container,
  Button,
  Section,
} from "@react-email/components";
import * as React from "react";

export default function PasswordReset({
  name,
  resetLink,
}: Omit<IPasswordReset, "recipients">) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#0D6EFD",
              textPrimary: "#1f2937",
              textSecondary: "#6b7280",
            },
            fontFamily: {
              sans: ["Segoe UI", "Helvetica", "Arial", "sans-serif"],
            },
          },
        },
      }}
    >
      <Section className="bg-background  bg-white flex items-center rounded-md justify-center p-6">
        <Container className="max-w-auto rounded-xl p-8 text-grayDark font-sans text-base">
          <h1 className="text-brand text-3xl font-bold mb-4">
            Password Reset Request
          </h1>

          <p className="text-textPrimary text-base mb-6">
            Hello {name}, you requested a password reset. Please click the
            button below to reset your password.
          </p>

          <Button
            href={resetLink}
            className="bg-brand text-white text-lg py-3 px-6 rounded-md block mx-auto mb-6"
          >
            Reset Password
          </Button>

          <p className="text-textSecondary text-sm">
            If you did not request a password reset, please ignore this email.
            The link will expire in 24 hours.
          </p>

          <hr className="my-6" />
          <p className="text-xs text-textSecondary text-center">
            You received this email because you requested a password reset for
            your account. If you have any questions, please contact our support
            team.
          </p>
        </Container>
      </Section>
    </Tailwind>
  );
}
