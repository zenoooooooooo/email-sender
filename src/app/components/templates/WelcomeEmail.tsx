import {
  Button,
  Container,
  Html,
  Tailwind,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

export default function WelcomeEmail({
  name,
  loginLink,
  email,
}: Omit<IWelcomeEmail, "recipients">) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
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
          <h1 className="text-2xl font-semibold mb-4">
            Welcome to Our Platform, {name}!
          </h1>

          <Text className="text-grayLight mb-4">
            We&apos;re thrilled to have you onboard. You&apos;ve signed up using{" "}
            <strong className="text-blue-600 underline">{email}</strong>.
          </Text>

          <Text className="text-grayLight mb-6">
            To get started, simply click the button below to log in to your
            account. We&apos;re here to help you make the most of your
            experience.
          </Text>

          <div className="text-center mb-6">
            <Button
              href={loginLink}
              className="bg-brand hover:opacity-90 px-6 py-3 font-medium text-white text-sm rounded-md transition duration-300"
            >
              Access Your Account
            </Button>
          </div>

          <Text className="text-xs text-gray-400">
            If you didn&apos;t create an account, you can safely ignore this
            email.
          </Text>
        </Container>
      </Section>
    </Tailwind>
  );
}
