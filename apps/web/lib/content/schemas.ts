import { z } from "zod";

export const baseContentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  coverImage: z.string().min(1),
  coverImageAlt: z.string().min(1),
  tags: z.array(z.string()).default([]),
  dateCreated: z.string().min(1),
  dateUpdated: z.string().min(1),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const projectSchema = baseContentSchema.extend({
  status: z.enum(["live", "in-progress", "archived", "experimental"]),
  category: z.array(z.string()).min(1),
  techStack: z.array(z.string()).min(1),
  links: z
    .object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
    })
    .default({}),
  architectureDiagram: z.string().optional(),
  outcome: z.string().optional(),
  changelog: z
    .array(
      z.object({
        date: z.string(),
        note: z.string(),
      }),
    )
    .optional(),
  dateStarted: z.string().min(1),
});

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  skills: z.array(
    z.object({
      name: z.string().min(1),
      relatedProjects: z.array(z.string()).optional(),
      relatedPosts: z.array(z.string()).optional(),
    }),
  ),
});

export const devPostSchema = baseContentSchema.extend({
  relatedProjects: z.array(z.string()).optional(),
  codeRepo: z.string().url().optional(),
  series: z.string().optional(),
  readingTime: z.number().optional(),
  techStack: z.array(z.string()).optional(),
});

export const musicPostSchema = baseContentSchema.extend({
  relatedRelease: z.string().optional(),
  merchLink: z.string().optional(),
  mood: z.string().optional(),
  genre: z.string().optional(),
  embedType: z.enum(["spotify", "soundcloud", "other"]).optional(),
});

export type BaseContent = z.infer<typeof baseContentSchema>;
export type ProjectMeta = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type DevPostMeta = z.infer<typeof devPostSchema>;
export type MusicPostMeta = z.infer<typeof musicPostSchema>;

export type Project = ProjectMeta & { body: string };
export type DevPost = DevPostMeta & { body: string };
export type MusicPost = MusicPostMeta & { body: string };
