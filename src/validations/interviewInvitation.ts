import { z } from "zod";

export const interviewInvitationSchema = z.object({
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
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  companyDescription: z
    .string()
    .min(1, { message: "Company description required" }),
  interviewDate: z.string().min(1, { message: "Interview date required" }),
  interviewTime: z.string().min(1, { message: "Interview time required" }),
  interviewLocation: z.string().min(1, { message: "Location required" }),
  interviewNotes: z.string().optional().default(""),
  contactMethod: z.string().min(1, { message: "Contact method required" }),
  contactLink: z.string().url({ message: "Must be a valid URL" }),
  departmentName: z.string().min(1, { message: "Department name required" }),
  logoLink: z.string().url({ message: "Must be a valid URL" }),
  contactPhone: z.string().min(1, { message: "Contact phone required" }),
  contactEmail: z.string().email({ message: "Invalid contact email" }),
});
