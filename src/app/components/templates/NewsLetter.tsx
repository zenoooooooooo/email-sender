import { Tailwind, Container, Section } from "@react-email/components";
import * as React from "react";
import { INewsLetter } from "@/types/INewsLetter";

export default function Newsletter({
  name,
  month,
  headline,
  content,
  unsubscribeLink,
  author,
}: Omit<INewsLetter, "recipients">) {
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
          <h1 className="text-brand text-3xl font-bold mb-1">
            Monthly Newsletter - {month}
          </h1>
          <p className="text-sm text-textSecondary mb-6">by {author}</p>

          <h2 className="text-textPrimary text-xl font-semibold mb-4">
            {headline}
          </h2>

          <p className="text-textPrimary text-base leading-relaxed mb-8 whitespace-pre-line">
            {content}
          </p>

          <hr className="my-6" />

          <p className="text-xs text-textSecondary text-center">
            You&apos;re receiving this newsletter because you subscribed to
            updates from <strong>{name}</strong>. If you no longer wish to
            receive these emails, you can{" "}
            <a
              href={unsubscribeLink}
              className="text-brand underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              unsubscribe here
            </a>
            .
          </p>
        </Container>
      </Section>
    </Tailwind>
  );
}
