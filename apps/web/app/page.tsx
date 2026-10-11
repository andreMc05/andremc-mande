import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const featured = (await getFeaturedProjects()).slice(0, 3);

  return (
    <div className="page-shell">
      <section className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-16">
        <p className="m-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-lake">
          {siteConfig.location} · Frontend Architecture, Platform Reliability, AI
          Tooling
        </p>
        <h1 className="mt-5 mb-0 max-w-3xl text-balance font-display text-5xl font-bold tracking-tight md:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 mb-0 max-w-xl text-lg text-ink-muted md:text-xl">
          {siteConfig.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-display text-sm font-semibold text-bg-elevated no-underline transition-colors duration-[var(--duration)] hover:bg-lake"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm border border-line bg-bg-elevated/70 px-5 py-3 font-display text-sm font-semibold text-ink no-underline transition-colors duration-[var(--duration)] hover:border-lake hover:text-lake"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="border-t border-line py-16" aria-labelledby="featured-heading">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 id="featured-heading" className="m-0 font-display text-3xl font-bold">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="font-display text-sm font-semibold text-lake no-underline hover:underline"
            >
              All projects
            </Link>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
