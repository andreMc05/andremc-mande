import path from "node:path";

/** Monorepo `content/` root (apps/web → ../../content). */
export function getContentRoot() {
  return path.resolve(
    /* turbopackIgnore: true */ process.cwd(),
    process.env.CONTENT_ROOT ?? "../../content",
  );
}

export function getCollectionDir(
  collection: "projects" | "blog-dev" | "blog-music",
) {
  return path.join(
    /* turbopackIgnore: true */ getContentRoot(),
    collection,
  );
}
