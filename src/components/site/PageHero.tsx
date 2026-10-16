export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-ink text-ivory">
      <div className="container-x py-20 text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-5xl md:text-6xl mt-4">{title}</h1>
        <div className="gold-rule w-24 mx-auto mt-6" />
        {sub && <p className="text-ivory/70 mt-6 max-w-2xl mx-auto">{sub}</p>}
      </div>
    </section>
  );
}
