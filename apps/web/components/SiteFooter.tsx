import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line/70 bg-bg-elevated/60">
      <div className="page-shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="m-0 font-display text-xl font-bold tracking-tight">
            {siteConfig.brand}
          </p>
          <p className="mt-2 mb-0 text-sm text-ink-muted">
            {siteConfig.name} · {siteConfig.location}
          </p>
          <p className="mt-4 mb-0 text-sm text-ink-muted">
            <a
              href={siteConfig.github}
              className="font-semibold text-ink no-underline hover:text-lake"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {" · "}
            <a
              href={siteConfig.linkedin}
              className="font-semibold text-ink no-underline hover:text-lake"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {" · "}
            <a
              href={siteConfig.resumePath}
              className="font-semibold text-ink no-underline hover:text-lake"
              download
            >
              Download resume
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-sm font-semibold text-ink no-underline hover:text-lake"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="page-shell border-t border-line/50 py-4 text-xs text-ink-muted">
        <p className="m-0">
          © 2026 {siteConfig.name}. Shop privacy/legal pages arrive with
          commerce.
        </p>
      </div>
    </footer>
  );
}
