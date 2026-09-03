export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-border bg-card px-8 py-6 shadow-xs">
          <span className="text-3xl sm:text-4xl font-black tracking-wider text-foreground">
            MUNIA<span className="text-primary">MART</span>
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Phase 1: Header, Footer, Light &amp; Black Mode Ready
          </p>
        </div>
      </div>
    </div>
  );
}
