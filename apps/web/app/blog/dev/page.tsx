import type { Metadata } from "next";
import { DevPostCard } from "@/components/DevPostCard";
import { PageIntro } from "@/components/PageIntro";
import { getAllDevPosts } from "@/lib/content/blog-dev";

export const metadata: Metadata = {
  title: "Blog · Dev",
  description: "Technical and engineering writing from Andre McGruder.",
};

export default async function BlogDevPage() {
  const posts = await getAllDevPosts();

  return (
    <div className="page-shell pb-20">
      <PageIntro
        eyebrow="Engineering"
        title="Dev blog"
        description="Notes on architecture, accessibility, AI tooling, and shipping reliable frontends."
      />
      {posts.length === 0 ? (
        <p className="text-ink-muted">No published posts yet.</p>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <DevPostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
