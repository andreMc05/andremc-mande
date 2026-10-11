import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Blog · Music",
  description: "Song and release highlights — darker editorial tone.",
};

export default function BlogMusicPage() {
  return (
    <div className="page-shell min-h-[60vh]">
      <PageIntro
        eyebrow="Creative"
        title="Music blog"
        description="Darker editorial shell is wired via data-theme. Posts and embeds come with the MDX pipeline."
      />
    </div>
  );
}
