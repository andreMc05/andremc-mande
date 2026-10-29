import Image from "next/image";
import Link from "next/link";
import type { DevPost } from "@/lib/content/schemas";

type DevPostCardProps = {
  post: DevPost;
};

export function DevPostCard({ post }: DevPostCardProps) {
  return (
    <article className="group flex flex-col border-t border-line pt-6">
      <Link
        href={`/blog/dev/${post.slug}`}
        className="block no-underline outline-offset-4"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-bg-elevated">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-cover transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <time
            dateTime={post.dateUpdated}
            className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-lake"
          >
            {post.dateUpdated}
          </time>
          {post.readingTime ? (
            <span className="font-mono text-xs text-ink-muted">
              {post.readingTime} min read
            </span>
          ) : null}
          {post.series ? (
            <span className="font-mono text-xs text-ink-muted">{post.series}</span>
          ) : null}
        </div>
        <h2 className="mt-2 mb-0 font-display text-2xl font-bold text-ink transition-colors group-hover:text-lake">
          {post.title}
        </h2>
        <p className="mt-2 mb-0 text-ink-muted">{post.summary}</p>
      </Link>
    </article>
  );
}
