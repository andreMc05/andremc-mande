import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxBody } from "@/components/MdxBody";
import { getAllDevPosts, getDevPostBySlug } from "@/lib/content/blog-dev";
import { getAllProjects } from "@/lib/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllDevPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDevPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
      type: "article",
    },
  };
}

export default async function DevPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getDevPostBySlug(slug);
  if (!post) notFound();

  const projects = await getAllProjects();
  const titleBySlug = Object.fromEntries(
    projects.map((p) => [p.slug, p.title]),
  );
  const related = (post.relatedProjects ?? []).filter(
    (projectSlug) => titleBySlug[projectSlug],
  );

  return (
    <article className="page-shell pb-20">
      <header className="py-12 md:py-16">
        <p className="m-0 font-mono text-xs font-medium uppercase tracking-[0.14em] text-lake">
          Dev blog
          {post.series ? ` · ${post.series}` : null}
        </p>
        <h1 className="mt-3 mb-0 max-w-3xl text-balance text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 mb-0 max-w-2xl text-lg text-ink-muted">
          {post.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-ink-muted">
          <time dateTime={post.dateUpdated}>Updated {post.dateUpdated}</time>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          {post.techStack?.length ? (
            <span>{post.techStack.join(" · ")}</span>
          ) : null}
        </div>
        {post.codeRepo ? (
          <p className="mt-6 mb-0">
            <a
              href={post.codeRepo}
              className="inline-flex rounded-sm border border-line bg-bg-elevated px-4 py-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:border-lake hover:text-lake"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code repository
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </header>

      <div className="relative aspect-[16/9] max-w-4xl overflow-hidden rounded-sm border border-line">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="prose-post mt-10 max-w-3xl">
        <MdxBody source={post.body} />
      </div>

      {related.length > 0 ? (
        <section className="mt-14 max-w-3xl" aria-labelledby="related-projects">
          <h2 id="related-projects" className="font-display text-2xl font-bold">
            Related projects
          </h2>
          <ul className="mt-4 list-none space-y-2 p-0">
            {related.map((projectSlug) => (
              <li key={projectSlug}>
                <Link
                  href={`/projects/${projectSlug}`}
                  className="font-display text-sm font-semibold text-lake no-underline hover:underline"
                >
                  {titleBySlug[projectSlug]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-16">
        <Link
          href="/blog/dev"
          className="font-display text-sm font-semibold text-lake no-underline hover:underline"
        >
          ← All dev posts
        </Link>
      </p>
    </article>
  );
}
