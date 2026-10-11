import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 mb-3 font-display text-2xl font-bold" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-2 font-display text-xl font-bold" {...props} />
  ),
  p: (props) => <p className="my-4 text-ink-muted" {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-ink-muted" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-ink-muted"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-semibold text-lake underline-offset-2 hover:underline"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm bg-bg-elevated px-1.5 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-sm border border-line bg-bg-elevated p-4 font-mono text-sm"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
};
