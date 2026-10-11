import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Live, in-progress, and experimental software from Andre McGruder.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="page-shell pb-20">
      <PageIntro
        eyebrow="Work"
        title="Projects"
        description="Selected builds from GitHub — games, digital humanities, music catalog tooling, and accessibility pre-audit."
      />
      <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
