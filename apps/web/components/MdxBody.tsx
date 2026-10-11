import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/content/mdx-components";

type MdxBodyProps = {
  source: string;
};

export function MdxBody({ source }: MdxBodyProps) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
