import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Blog · Dev",
  description: "Technical and engineering writing from Andre McGruder.",
};

export default function BlogDevPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Engineering"
        title="Dev blog"
        description="MDX posts from content/blog-dev — pipeline arrives in step 2."
      />
    </div>
  );
}
