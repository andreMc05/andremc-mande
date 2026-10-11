import fs from "node:fs/promises";
import path from "node:path";
import { getContentRoot } from "./paths";
import { skillGroupSchema, type SkillGroup } from "./schemas";

export async function getSkillGroups(): Promise<SkillGroup[]> {
  "use cache";
  const filePath = path.join(
    /* turbopackIgnore: true */ getContentRoot(),
    "skills",
    "skills.json",
  );
  const raw = await fs.readFile(filePath, "utf8");
  const data: unknown = JSON.parse(raw);
  const parsed = skillGroupSchema.array().safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid skills.json: ${issues}`);
  }

  return parsed.data;
}
