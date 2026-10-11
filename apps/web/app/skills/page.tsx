import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getAllProjects } from "@/lib/content/projects";
import { getSkillGroups } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Frontend architecture, cloud observability, AI tooling, and delivery practices — demonstrated through projects, not self-ratings.",
};

export default async function SkillsPage() {
  const [groups, projects] = await Promise.all([
    getSkillGroups(),
    getAllProjects(),
  ]);

  const titleBySlug = Object.fromEntries(
    projects.map((p) => [p.slug, p.title]),
  );

  return (
    <div className="page-shell pb-20">
      <PageIntro
        eyebrow="Depth over ratings"
        title="Skills"
        description="From 12+ years across digital signage, healthcare, and federal systems. Skills link to public projects where they show up in the wild — no proficiency bars."
      />

      <div className="space-y-14">
        {groups.map((group) => (
          <section
            key={group.group}
            aria-labelledby={`skill-group-${slugify(group.group)}`}
          >
            <h2
              id={`skill-group-${slugify(group.group)}`}
              className="m-0 border-b border-line pb-3 font-display text-2xl font-bold md:text-3xl"
            >
              {group.group}
            </h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
              {group.skills.map((skill) => {
                const related = (skill.relatedProjects ?? []).filter(
                  (slug) => titleBySlug[slug],
                );

                return (
                  <li key={skill.name} className="border-t border-line pt-4">
                    <p className="m-0 font-display text-base font-semibold text-ink">
                      {skill.name}
                    </p>
                    {related.length > 0 ? (
                      <ul className="mt-2 mb-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0">
                        {related.map((slug) => (
                          <li key={slug}>
                            <Link
                              href={`/projects/${slug}`}
                              className="font-mono text-xs text-lake no-underline hover:underline"
                            >
                              {titleBySlug[slug]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 mb-0 font-mono text-xs text-ink-muted">
                        Demonstrated in professional work
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
