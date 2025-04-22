import { z } from "zod";
import { months } from "@/enums/months";
export const newsletterSchema = z.object({
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

  month: z.nativeEnum(months, { required_error: "Month is required" }),
  headline: z.string().min(1, { message: "Headline is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  unsubscribeLink: z
    .string()
    .url({ message: "Unsubscribe link must be a valid URL" }),
  author: z.string().min(1, { message: "Author is required" }),
});
