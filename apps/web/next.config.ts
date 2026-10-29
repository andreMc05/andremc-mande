import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(appDir, "../..");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Include monorepo MDX when deploying with Root Directory = apps/web
  outputFileTracingRoot: repoRoot,
  outputFileTracingIncludes: {
    "/*": ["../../content/**/*"],
    "/skills": ["../../content/skills/**/*"],
    "/projects": ["../../content/projects/**/*"],
    "/projects/[slug]": ["../../content/projects/**/*"],
    "/blog/dev": ["../../content/blog-dev/**/*"],
    "/blog/dev/[slug]": ["../../content/blog-dev/**/*"],
  },
  images: {
    // Project covers are in-repo SVGs for now; swap to photos later.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
