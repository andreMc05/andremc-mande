import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg-elevated/85 backdrop-blur-md">
      <div className="page-shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ink no-underline transition-opacity duration-[var(--duration)] hover:opacity-80"
        >
          {siteConfig.brand}
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {primaryNav.map((item) => {
              if (item.children) {
                return (
                  <li key={item.label} className="group relative">
                    <span className="inline-flex items-center gap-1 rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink-muted">
                      {item.label}
                    </span>
                    <ul className="absolute left-0 top-full m-0 hidden min-w-[9rem] list-none rounded-sm border border-line bg-bg-elevated p-1 shadow-sm group-hover:block group-focus-within:block">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink no-underline hover:bg-lake-soft"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              if (item.external) {
                const isPlaceholder = item.href === "#";
                return (
                  <li key={item.label}>
                    {isPlaceholder ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink-muted"
                        title="Music site URL coming soon"
                      >
                        {item.label}
                        <span aria-hidden="true">↗</span>
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-1 rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-lake"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-ink-muted">
                          ↗
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-lake"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-sm border border-line bg-bg-elevated px-3 py-2 font-display text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <ul className="absolute right-0 top-full z-50 m-0 mt-2 w-56 list-none rounded-sm border border-line bg-bg-elevated p-2 shadow-md">
            {primaryNav.flatMap((item) => {
              if (item.children) {
                return item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block rounded-sm px-3 py-2 font-display text-sm font-semibold no-underline hover:bg-lake-soft"
                    >
                      Blog · {child.label}
                    </Link>
                  </li>
                ));
              }
              if (item.external) {
                return [
                  <li key={item.label}>
                    {item.href === "#" ? (
                      <span className="block rounded-sm px-3 py-2 font-display text-sm font-semibold text-ink-muted">
                        {item.label} ↗
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        className="block rounded-sm px-3 py-2 font-display text-sm font-semibold no-underline hover:bg-lake-soft"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label} ↗
                      </a>
                    )}
                  </li>,
                ];
              }
              return [
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-sm px-3 py-2 font-display text-sm font-semibold no-underline hover:bg-lake-soft"
                  >
                    {item.label}
                  </Link>
                </li>,
              ];
            })}
          </ul>
        </details>
      </div>
    </header>
  );
}
