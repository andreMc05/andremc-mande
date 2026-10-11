import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxBody } from "@/components/MdxBody";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage, alt: project.coverImageAlt }],
    },
  };
}

const statusLabel = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  experimental: "Experimental",
} as const;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const links = [
    project.links.live && { href: project.links.live, label: "Live site" },
    project.links.demo && { href: project.links.demo, label: "Demo" },
    project.links.repo && { href: project.links.repo, label: "Repository" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <article className="page-shell pb-20">
      <header className="py-12 md:py-16">
        <p className="m-0 font-mono text-xs font-medium uppercase tracking-[0.14em] text-lake">
          {statusLabel[project.status]}
          {project.outcome ? " · Case study" : null}
        </p>
        <h1 className="mt-3 mb-0 max-w-3xl text-balance text-4xl md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 mb-0 max-w-2xl text-lg text-ink-muted">
          {project.summary}
        </p>
        {project.outcome ? (
          <p className="mt-4 mb-0 max-w-2xl border-l-2 border-accent pl-4 text-ink">
            {project.outcome}
          </p>
        ) : null}

        {links.length > 0 ? (
          <ul className="mt-8 mb-0 flex list-none flex-wrap gap-3 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex rounded-sm border border-line bg-bg-elevated px-4 py-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:border-lake hover:text-lake"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="relative aspect-[16/9] max-w-4xl overflow-hidden rounded-sm border border-line">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <dl className="mt-10 grid max-w-4xl gap-6 border-y border-line py-8 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            Tech stack
          </dt>
          <dd className="mt-2 mb-0">
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm bg-lake-soft px-2 py-1 font-mono text-xs text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            Categories
          </dt>
          <dd className="mt-2 mb-0 text-ink">{project.category.join(" · ")}</dd>
        </div>
      </dl>

      <div className="prose-project mt-10 max-w-3xl">
        <MdxBody source={project.body} />
      </div>

      {project.changelog?.length ? (
        <section className="mt-14 max-w-3xl" aria-labelledby="changelog-heading">
          <h2 id="changelog-heading" className="font-display text-2xl font-bold">
            Changelog
          </h2>
          <ol className="mt-4 list-none space-y-3 border-l border-line pl-0">
            {project.changelog.map((entry) => (
              <li key={`${entry.date}-${entry.note}`} className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-accent"
                />
                <time
                  dateTime={entry.date}
                  className="font-mono text-xs text-ink-muted"
                >
                  {entry.date}
                </time>
                <p className="mt-1 mb-0 text-ink-muted">{entry.note}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <p className="mt-16">
        <Link
          href="/projects"
          className="font-display text-sm font-semibold text-lake no-underline hover:underline"
        >
          ← All projects
        </Link>
      </p>
    </article>
  );
}
