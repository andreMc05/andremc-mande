"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  contactFormSchema,
  fieldErrorsFromZod,
  type ContactFieldErrors,
} from "@/lib/contact/schema";

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function updateField(name: keyof typeof initialValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "submitting" });

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      setFieldErrors(fieldErrorsFromZod(parsed.error));
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setStatus({
          type: "error",
          message:
            data.error ??
            "Something went wrong sending your message. Please try again.",
        });
        return;
      }

      setValues(initialValues);
      setStatus({
        type: "success",
        message:
          data.message ??
          "Thanks — your message was sent. I’ll get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Network error. Check your connection and try again, or email me directly.",
      });
    }
  }

  const isSubmitting = status.type === "submitting";
  const statusId = `${formId}-status`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="max-w-xl space-y-6"
      aria-describedby={status.type !== "idle" ? statusId : undefined}
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>

      <Field
        id={`${formId}-name`}
        label="Name"
        error={fieldErrors.name}
        required
      >
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={
            fieldErrors.name ? `${formId}-name-error` : undefined
          }
          className={inputClass(Boolean(fieldErrors.name))}
        />
      </Field>

      <Field
        id={`${formId}-email`}
        label="Email"
        error={fieldErrors.email}
        required
      >
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={
            fieldErrors.email ? `${formId}-email-error` : undefined
          }
          className={inputClass(Boolean(fieldErrors.email))}
        />
      </Field>

      <Field
        id={`${formId}-subject`}
        label="Subject"
        error={fieldErrors.subject}
        required
      >
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          required
          value={values.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          aria-invalid={Boolean(fieldErrors.subject)}
          aria-describedby={
            fieldErrors.subject ? `${formId}-subject-error` : undefined
          }
          className={inputClass(Boolean(fieldErrors.subject))}
        />
      </Field>

      <Field
        id={`${formId}-message`}
        label="Message"
        error={fieldErrors.message}
        required
        hint="At least 20 characters."
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={7}
          required
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            [
              `${formId}-message-hint`,
              fieldErrors.message ? `${formId}-message-error` : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`${inputClass(Boolean(fieldErrors.message))} resize-y`}
        />
      </Field>

      {status.type === "success" || status.type === "error" ? (
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={
            status.type === "success"
              ? "m-0 border-l-2 border-lake pl-3 text-ink"
              : "m-0 border-l-2 border-accent pl-3 text-ink"
          }
        >
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-display text-sm font-semibold text-bg-elevated transition-colors duration-[var(--duration)] hover:bg-lake disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-display text-sm font-semibold text-ink"
      >
        {label}
        {required ? (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 mb-0 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 mb-0 text-sm font-medium text-accent"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-sm border bg-bg-elevated px-3 py-2.5 font-body text-base text-ink",
    "placeholder:text-ink-muted/70",
    "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus",
    hasError ? "border-accent" : "border-line",
  ].join(" ");
}
