import { loadMdxCollection } from "./mdx";
import { projectSchema, type Project } from "./schemas";

function toProject(
  doc: Awaited<ReturnType<typeof loadMdxCollection<typeof projectSchema>>>[number],
): Project {
  const { filePath: _filePath, ...project } = doc;
  return project;
}

export async function getAllProjects(): Promise<Project[]> {
  "use cache";
  const docs = await loadMdxCollection("projects", projectSchema);
  return docs
    .map(toProject)
    .sort((a, b) => b.dateUpdated.localeCompare(a.dateUpdated));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  "use cache";
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  "use cache";
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  "use cache";
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}
