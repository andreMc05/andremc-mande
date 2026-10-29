import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(160, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(5000, "Message is too long."),
  /** Honeypot — bots fill this; humans leave it empty. */
  company: z.string().optional().default(""),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormInput, string>
>;

export function fieldErrorsFromZod(
  error: z.ZodError,
): ContactFieldErrors {
  const fields: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in fields)) {
      fields[key as keyof ContactFormInput] = issue.message;
    }
  }
  return fields;
}
