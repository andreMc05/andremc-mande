import { loadMdxCollection } from "./mdx";
import { devPostSchema, type DevPost } from "./schemas";

function toPost(
  doc: Awaited<ReturnType<typeof loadMdxCollection<typeof devPostSchema>>>[number],
): DevPost {
  const { filePath: _filePath, ...post } = doc;
  return post;
}

export async function getAllDevPosts(): Promise<DevPost[]> {
  "use cache";
  const docs = await loadMdxCollection("blog-dev", devPostSchema);
  return docs
    .map(toPost)
    .sort((a, b) => b.dateUpdated.localeCompare(a.dateUpdated));
}

export async function getFeaturedDevPosts(): Promise<DevPost[]> {
  "use cache";
  const posts = await getAllDevPosts();
  return posts.filter((p) => p.featured);
}

export async function getDevPostBySlug(
  slug: string,
): Promise<DevPost | undefined> {
  "use cache";
  const posts = await getAllDevPosts();
  return posts.find((p) => p.slug === slug);
}
