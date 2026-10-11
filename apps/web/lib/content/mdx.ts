import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import type { z } from "zod";
import { getCollectionDir } from "./paths";

type Collection = "projects" | "blog-dev" | "blog-music";

export type MdxDocument<TMeta> = TMeta & {
  body: string;
  filePath: string;
};

export async function loadMdxCollection<TSchema extends z.ZodType>(
  collection: Collection,
  schema: TSchema,
  options: { includeDrafts?: boolean } = {},
): Promise<MdxDocument<z.infer<TSchema>>[]> {
  const dir = getCollectionDir(collection);
  const files = await fg("**/*.{md,mdx}", {
    cwd: dir,
    absolute: true,
    onlyFiles: true,
  });

  const docs: MdxDocument<z.infer<TSchema>>[] = [];

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const slugFromFile = path.basename(filePath, path.extname(filePath));
    const parsed = schema.safeParse({
      ...data,
      slug: data.slug ?? slugFromFile,
    });

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`Invalid frontmatter in ${filePath}: ${issues}`);
    }

    const meta = parsed.data as z.infer<TSchema> & {
      draft?: boolean;
    };

    if (meta.draft && !options.includeDrafts) {
      continue;
    }

    docs.push({
      ...meta,
      body: content.trim(),
      filePath,
    });
  }

  return docs;
}
