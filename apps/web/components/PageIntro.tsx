type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-2xl py-16 md:py-20">
      {eyebrow ? (
        <p className="m-0 font-mono text-xs font-medium uppercase tracking-[0.14em] text-lake">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 mb-0 text-balance text-4xl md:text-5xl">{title}</h1>
      <p className="mt-4 mb-0 text-lg text-ink-muted">{description}</p>
    </header>
  );
}
