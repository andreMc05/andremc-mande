import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Shop",
  description: "Non-music merch via headless Shopify and Printify.",
};

export default function ShopPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Merch"
        title="Shop"
        description="Storefront content comes later — non-music merch only. Music sales live on the separate music site."
      />
    </div>
  );
}
