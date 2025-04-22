import { z } from "zod";

export const welcomeEmailSchema = z.object({
  recipients: z
    .string()
    .nonempty({ message: "At least one recipient is required" })
    .refine(
      (value) => {
        const emails = value.split(",").map((e) => e.trim());
        return emails.every((email) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
      },
      {
        message:
          "All recipients must be valid email addresses separated by commas",
      }
    ),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name is too long" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),

  loginLink: z
    .string()
    .url({ message: "Login link must be a valid URL" })
    .nonempty({ message: "Login link is required" }),
});

