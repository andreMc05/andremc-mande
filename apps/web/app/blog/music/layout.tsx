export default function MusicBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="music" className="min-h-[60vh] bg-bg text-ink">
      {children}
    </div>
  );
}
