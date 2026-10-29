import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Andre McGruder.",
};

export default function ContactPage() {
  return (
    <div className="page-shell pb-20">
      <PageIntro
        eyebrow="Hello"
        title="Contact"
        description="Tell me about a role, collaboration, or accessibility/tooling problem. I usually reply within a few days."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-start">
        <ContactForm />

        <aside className="max-w-sm border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <h2 className="m-0 font-display text-lg font-bold">Direct</h2>
          <ul className="mt-4 mb-0 list-none space-y-3 p-0 text-ink-muted">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-ink no-underline hover:text-lake"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                className="font-semibold text-ink no-underline hover:text-lake"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.github}
                className="font-semibold text-ink no-underline hover:text-lake"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.resumePath}
                className="font-semibold text-ink no-underline hover:text-lake"
                download
              >
                Download resume
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
