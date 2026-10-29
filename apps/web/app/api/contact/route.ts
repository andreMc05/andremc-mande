import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactFormSchema,
  fieldErrorsFromZod,
} from "@/lib/contact/schema";
import { siteConfig } from "@/lib/site";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please wait a minute and try again.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  // Honeypot filled — pretend success so bots get no signal.
  if (parsed.data.company.trim()) {
    return NextResponse.json({
      ok: true,
      message: "Thanks — your message was sent.",
    });
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "andremcmade <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const htmlBody = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY missing — logging submission only");
      console.info(textBody);
      return NextResponse.json({
        ok: true,
        message:
          "Thanks — message accepted locally (email not configured). Set RESEND_API_KEY to send mail.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Contact email is not configured yet. Please email me directly for now.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[andremcmade] ${subject}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Could not send your message. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks — your message was sent. I’ll get back to you soon.",
    });
  } catch (error) {
    console.error("[contact] Unexpected error", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not send your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
