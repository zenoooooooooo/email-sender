import { z } from "zod";

export const passwordResetSchema = z.object({
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
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  resetLink: z
    .string()
    .min(1, "Reset link is required")
    .url("Invalid URL format"),
});

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
