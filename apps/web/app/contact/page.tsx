import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Andre McGruder.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Hello"
        title="Contact"
        description="Form UI and POST /api/contact (Vercel Route Handler) land after the content pipeline. Validation will be server-side."
      />
    </div>
  );
}
