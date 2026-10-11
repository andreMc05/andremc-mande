import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/schemas";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  experimental: "Experimental",
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col border-t border-line pt-6">
      <Link
        href={`/projects/${project.slug}`}
        className="block no-underline outline-offset-4"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-bg-elevated">
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt}
            fill
            className="object-cover transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="m-0 font-mono text-xs font-medium uppercase tracking-[0.12em] text-lake">
            {statusLabel[project.status]}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {project.category.slice(0, 2).map((cat) => (
              <li
                key={cat}
                className="font-mono text-xs text-ink-muted"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="mt-2 mb-0 font-display text-2xl font-bold text-ink transition-colors group-hover:text-lake">
          {project.title}
        </h2>
        <p className="mt-2 mb-0 text-ink-muted">{project.summary}</p>
      </Link>
    </article>
  );
}
