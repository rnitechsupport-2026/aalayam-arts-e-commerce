import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { availability, formatINR, minPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = wishlist.includes(p.slug);
  const canBuy = p.madeToOrder || p.stock > 0;

  return (
    <article className="group bg-card rounded-lg overflow-hidden border shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to="/product/$slug" params={{ slug: p.slug }}>
          <img src={p.images[0]} alt={p.name} loading="lazy" width={1024} height={1280} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {p.bestSeller && <span className="bg-ink/85 text-gold text-[0.6rem] uppercase tracking-widest px-2 py-1 rounded">Best Seller</span>}
          {p.newArrival && <span className="bg-gold text-ink text-[0.6rem] uppercase tracking-widest px-2 py-1 rounded">New</span>}
        </div>
        <button onClick={() => toggleWish(p.slug)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished}
          className="absolute top-3 right-3 size-9 grid place-items-center rounded-full bg-background/90 hover:bg-background">
          <Heart className={`size-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <button onClick={() => setQuick(true)} className="btn bg-background/95 text-foreground flex-1 py-2 text-[0.7rem]"><Eye className="size-3.5" />Quick View</button>
          <button disabled={!canBuy} onClick={() => add(p.slug, p.variants[0].id)} className="btn btn-primary flex-1 py-2 text-[0.7rem]"><ShoppingBag className="size-3.5" />Add</button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{p.material} · {p.variants[0].height}{p.variants.length > 1 ? "+" : ""}</p>
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block font-serif text-xl mt-1 leading-snug hover:text-primary">{p.name}</Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-semibold">{p.variants.length > 1 && <span className="text-xs text-muted-foreground font-normal">from </span>}{formatINR(minPrice(p))}</span>
          <span className={`text-xs ${p.stock === 0 && !p.madeToOrder ? "text-destructive" : "text-success"}`}>{availability(p)}</span>
        </div>
        <Link to="/product/$slug" params={{ slug: p.slug }} className="mt-3 inline-block text-xs uppercase tracking-widest text-primary border-b border-gold pb-0.5">View Details</Link>
      </div>

      {quick && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={p.name}>
          <div className="absolute inset-0 bg-ink/60" onClick={() => setQuick(false)} />
          <div className="relative bg-background rounded-lg max-w-3xl w-full grid md:grid-cols-2 overflow-hidden animate-in zoom-in-95">
            <img src={p.images[0]} alt={p.name} className="w-full h-72 md:h-full object-cover" />
            <div className="p-6">
              <button className="absolute top-3 right-3" aria-label="Close" onClick={() => setQuick(false)}><X className="size-5" /></button>
              <p className="eyebrow">{p.material} · {p.style}</p>
              <h3 className="text-3xl mt-2">{p.name}</h3>
              <p className="text-primary text-xl font-semibold mt-2">{formatINR(minPrice(p))}</p>
              <p className="text-sm text-muted-foreground mt-3">{p.description}</p>
              <p className="text-sm mt-3">{availability(p)}</p>
              <div className="flex gap-2 mt-6">
                <button disabled={!canBuy} onClick={() => { add(p.slug, p.variants[0].id); setQuick(false); }} className="btn btn-primary flex-1">Add to Cart</button>
                <Link to="/product/$slug" params={{ slug: p.slug }} className="btn btn-outline flex-1">Details</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl mt-3">{title}</h2>
      <div className="gold-rule w-24 mx-auto mt-5" />
      {sub && <p className="text-muted-foreground mt-5">{sub}</p>}
    </div>
  );
}
