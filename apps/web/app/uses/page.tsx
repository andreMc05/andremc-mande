import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Uses / Stack",
  description: "Tools, stack, and setup used to build and ship.",
};

export default function UsesPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Toolkit"
        title="Uses / Stack"
        description="Placeholder for editor, hardware, cloud, and day-to-day tooling notes."
      />
    </div>
  );
}
