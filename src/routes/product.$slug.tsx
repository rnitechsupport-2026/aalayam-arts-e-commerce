import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, Ruler, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { availability, formatINR, getProduct, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} — ${p.material} ${p.deity} Idol | Aalayam Arts` : "Sculpture | Aalayam Arts";
    const desc = p ? p.description : "Temple sculpture from Aalayam Arts.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "product" }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, toggleWish, wishlist } = useStore();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(p.variants[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<string | null>(null);
  const canBuy = p.madeToOrder || p.stock > 0;
  const related = products.filter((x) => x.slug !== p.slug && (x.deity === p.deity || x.material === p.material)).slice(0, 4);

  const checkPin = () => {
    if (!/^[1-9]\d{5}$/.test(pin)) return setPinMsg("Please enter a valid 6-digit PIN code.");
    if (p.largeItem) return setPinMsg("This is a large sculpture — shipping for your PIN code will be confirmed manually with a quote.");
    const south = /^[5-6]/.test(pin);
    setPinMsg(`Estimated delivery ${p.madeToOrder ? "after production" : ""} in ${south ? "4–6" : "6–9"} business days (estimate, not guaranteed).`);
  };

  return (
    <div className="container-x py-10">
      <nav className="text-xs text-muted-foreground mb-6" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="text-foreground">{p.name}</span></nav>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`size-20 rounded overflow-hidden border-2 ${img === i ? "border-gold" : "border-transparent"}`}><img src={src} alt="" className="size-full object-cover" /></button>
            ))}
          </div>
          <div className="relative flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-muted cursor-zoom-in"
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
            onMouseLeave={() => setZoom(null)}>
            <img src={p.images[img]} alt={p.name} className="size-full object-cover transition-transform duration-200" style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
          </div>
        </div>

        <div>
          <p className="eyebrow">{p.material} · {p.style}</p>
          <h1 className="text-4xl md:text-5xl mt-3">{p.name}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span>SKU {p.sku}</span><span className="flex items-center gap-1"><Star className="size-4 fill-gold text-gold" />{p.rating} ({p.reviews} reviews)</span>
          </div>
          <p className="text-3xl text-primary font-semibold mt-6">{formatINR(variant.price)}</p>
          <p className="text-xs text-muted-foreground">Inclusive of taxes · Demonstration price</p>
          <p className={`mt-4 text-sm font-medium ${canBuy ? "text-success" : "text-destructive"}`}>{availability(p)}</p>

          <div className="mt-8">
            <p className="text-sm font-semibold mb-3">Height</p>
            <div className="flex flex-wrap gap-2">
              {p.variants.map((v) => (
                <button key={v.id} onClick={() => setVariant(v)} aria-pressed={variant.id === v.id} className={`px-4 py-2 border rounded text-sm ${variant.id === v.id ? "border-primary bg-primary text-primary-foreground" : "hover:border-gold"}`}>{v.label}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex items-center border rounded">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="size-4" /></button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(Math.min(20, qty + 1))} className="p-3"><Plus className="size-4" /></button>
            </div>
            <button disabled={!canBuy} onClick={() => add(p.slug, variant.id, qty)} className="btn btn-primary flex-1">Add to Cart</button>
            <button onClick={() => toggleWish(p.slug)} aria-label="Toggle wishlist" className="btn btn-outline px-4"><Heart className={`size-4 ${wishlist.includes(p.slug) ? "fill-current" : ""}`} /></button>
          </div>
          <button disabled={!canBuy} onClick={() => { add(p.slug, variant.id, qty); navigate({ to: "/checkout" }); }} className="btn btn-gold w-full mt-3">Buy Now</button>

          <div className="mt-8 p-5 border rounded-lg bg-card">
            <p className="text-sm font-semibold flex items-center gap-2"><Truck className="size-4 text-gold" />Check delivery</p>
            <div className="flex gap-2 mt-3">
              <label htmlFor="pin" className="sr-only">PIN code</label>
              <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="field" placeholder="Enter PIN code" />
              <button onClick={checkPin} className="btn btn-outline py-2">Check</button>
            </div>
            {pinMsg && <p className="text-sm text-muted-foreground mt-3">{pinMsg}</p>}
            {p.largeItem && (
              <Link to="/contact" search={{ subject: `Shipping quote: ${p.sku} (${variant.label})` }} className="inline-block mt-3 text-sm text-primary underline">Request Shipping Quote</Link>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 text-sm">
            {[["Material", p.material], ["Finish", p.finish], ["Height", variant.height], ["Width", p.width], ["Depth", p.depth], ["Weight (base size)", p.weight]].map(([k, val]) => (
              <div key={k} className="border-b pb-2"><dt className="text-muted-foreground text-xs">{k}</dt><dd>{val}</dd></div>
            ))}
          </dl>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-10 mt-20">
        <div className="md:col-span-2 space-y-8">
          <div><h2 className="text-3xl">Description</h2><p className="text-muted-foreground mt-3 leading-relaxed">{p.description}</p></div>
          <div><h2 className="text-3xl">Craftsmanship</h2><p className="text-muted-foreground mt-3 leading-relaxed">{p.craft}</p></div>
          <div>
            <h2 className="text-3xl">Customer Reviews</h2>
            <div className="mt-4 border rounded-lg p-6 bg-card"><p className="flex items-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</p><p className="font-serif text-lg mt-2">"Beautiful detailing and carefully packed."</p><p className="text-xs text-muted-foreground mt-2">Sample review · verified reviews will appear once orders are live</p></div>
            <button onClick={() => toast.info("Reviews can be written after purchase once accounts are enabled.")} className="btn btn-outline mt-4">Write a review</button>
          </div>
        </div>
        <aside className="space-y-4 text-sm">
          <div className="border rounded-lg p-5"><p className="font-semibold flex items-center gap-2"><Truck className="size-4 text-gold" />Shipping</p><p className="text-muted-foreground mt-2">Insured shipping across India and internationally. Heavy and fragile sculptures may need manual shipping confirmation.</p><Link to="/info/$page" params={{ page: "shipping" }} className="text-primary underline mt-2 inline-block">Shipping policy</Link></div>
          <div className="border rounded-lg p-5"><p className="font-semibold flex items-center gap-2"><Ruler className="size-4 text-gold" />Returns</p><p className="text-muted-foreground mt-2">Transit damage claims within 48 hours of delivery. Made-to-order pieces are non-returnable.</p><Link to="/info/$page" params={{ page: "returns" }} className="text-primary underline mt-2 inline-block">Returns policy</Link></div>
        </aside>
      </section>

      {related.length > 0 && <section className="mt-20"><h2 className="text-4xl mb-8">You may also like</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>}
    </div>
  );
}
