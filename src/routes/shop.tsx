import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { categories, minPrice, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";

const search = z.object({
  q: z.string().optional(),
  cat: z.string().optional(),
  sort: z.enum(["featured", "low", "high", "new", "best"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop Temple Statues & Deity Idols — Aalayam Arts" },
      { name: "description", content: "Browse bronze, brass and granite deity idols. Filter by deity, material, size, price and availability." },
      { property: "og:title", content: "Shop — Aalayam Arts" },
      { property: "og:description", content: "Temple statues and deity idols with filters for deity, material and size." },
    ],
  }),
  component: Shop,
});

const deities = [...new Set(products.map((p) => p.deity))];
const materials = [...new Set(products.map((p) => p.material))];
const styles = [...new Set(products.map((p) => p.style))];
const heightBands = [["Up to 12 in", 0, 12], ["13–24 in", 13, 24], ["25 in +", 25, 999]] as const;
const PAGE = 6;

function Shop() {
  const { q, cat, sort = "featured" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [f, setF] = useState({ deity: [] as string[], material: [] as string[], style: [] as string[], height: [] as string[], maxPrice: 200000, inStock: false, type: "all" as "all" | "ready" | "mto" });
  const [shown, setShown] = useState(PAGE);
  const [mobile, setMobile] = useState(false);

  const toggle = (k: "deity" | "material" | "style" | "height", v: string) =>
    setF((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));

  const list = useMemo(() => {
    const term = q?.toLowerCase().trim();
    let r = products.filter((p) => {
      if (cat && p.category !== cat && !(cat === "bronze-panchaloha" && p.material === "Bronze") && !(cat === "granite-stone" && p.material === "Granite") && !(cat === "brass-pooja" && p.material === "Brass") && !(cat === "custom-temple" && p.madeToOrder)) return false;
      if (term && !`${p.name} ${p.deity} ${p.material} ${p.style} ${p.description}`.toLowerCase().includes(term)) return false;
      if (f.deity.length && !f.deity.includes(p.deity)) return false;
      if (f.material.length && !f.material.includes(p.material)) return false;
      if (f.style.length && !f.style.includes(p.style)) return false;
      if (f.height.length) {
        const ok = p.variants.some((v) => { const h = parseInt(v.height); return heightBands.some(([l, a, b]) => f.height.includes(l) && h >= a && h <= b); });
        if (!ok) return false;
      }
      if (minPrice(p) > f.maxPrice) return false;
      if (f.inStock && p.stock === 0) return false;
      if (f.type === "ready" && p.madeToOrder) return false;
      if (f.type === "mto" && !p.madeToOrder) return false;
      return true;
    });
    r = [...r].sort((a, b) =>
      sort === "low" ? minPrice(a) - minPrice(b) : sort === "high" ? minPrice(b) - minPrice(a) : sort === "new" ? b.addedAt.localeCompare(a.addedAt) : sort === "best" ? b.sold - a.sold : Number(!!b.featured) - Number(!!a.featured));
    return r;
  }, [q, cat, sort, f]);

  const catName = categories.find((c) => c.slug === cat)?.name;

  const Check = ({ k, v }: { k: "deity" | "material" | "style" | "height"; v: string }) => (
    <label className="flex items-center gap-2 text-sm py-1 cursor-pointer"><input type="checkbox" className="accent-primary" checked={f[k].includes(v)} onChange={() => toggle(k, v)} />{v}</label>
  );

  const filters = (
    <div className="space-y-7">
      <div><h3 className="eyebrow mb-2">Deity</h3>{deities.map((d) => <Check key={d} k="deity" v={d} />)}</div>
      <div><h3 className="eyebrow mb-2">Material</h3>{materials.map((d) => <Check key={d} k="material" v={d} />)}</div>
      <div><h3 className="eyebrow mb-2">Height</h3>{heightBands.map(([l]) => <Check key={l} k="height" v={l} />)}</div>
      <div><h3 className="eyebrow mb-2">Style</h3>{styles.map((d) => <Check key={d} k="style" v={d} />)}</div>
      <div>
        <h3 className="eyebrow mb-2">Max price</h3>
        <input type="range" min={2000} max={200000} step={1000} value={f.maxPrice} onChange={(e) => setF({ ...f, maxPrice: +e.target.value })} className="w-full accent-primary" aria-label="Maximum price" />
        <p className="text-sm text-muted-foreground">Up to ₹{f.maxPrice.toLocaleString("en-IN")}</p>
      </div>
      <div>
        <h3 className="eyebrow mb-2">Availability</h3>
        <label className="flex items-center gap-2 text-sm py-1"><input type="checkbox" className="accent-primary" checked={f.inStock} onChange={(e) => setF({ ...f, inStock: e.target.checked })} />In stock only</label>
        {(["all", "ready", "mto"] as const).map((t) => (
          <label key={t} className="flex items-center gap-2 text-sm py-1"><input type="radio" name="type" className="accent-primary" checked={f.type === t} onChange={() => setF({ ...f, type: t })} />{t === "all" ? "All" : t === "ready" ? "Ready-made" : "Made-to-order"}</label>
        ))}
      </div>
      <button onClick={() => setF({ deity: [], material: [], style: [], height: [], maxPrice: 200000, inStock: false, type: "all" })} className="text-sm text-primary underline">Clear filters</button>
    </div>
  );

  return (
    <div className="container-x py-12">
      <div className="mb-10">
        <p className="eyebrow">Catalogue</p>
        <h1 className="text-5xl mt-2">{catName ?? (q ? `Results for "${q}"` : "All Sculptures")}</h1>
        <p className="text-xs text-muted-foreground mt-3">All products shown are demonstration data until real inventory is added.</p>
        {(cat || q) && <div className="flex gap-2 mt-4">
          {cat && <button onClick={() => navigate({ search: (s) => ({ ...s, cat: undefined }) })} className="text-xs border rounded-full px-3 py-1 flex items-center gap-1">{catName}<X className="size-3" /></button>}
          {q && <button onClick={() => navigate({ search: (s) => ({ ...s, q: undefined }) })} className="text-xs border rounded-full px-3 py-1 flex items-center gap-1">"{q}"<X className="size-3" /></button>}
        </div>}
      </div>
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          <div className="flex items-center justify-between mb-6 gap-4">
            <button className="lg:hidden btn btn-outline py-2" onClick={() => setMobile(true)}><SlidersHorizontal className="size-4" />Filters</button>
            <p className="text-sm text-muted-foreground hidden sm:block">{list.length} sculptures</p>
            <label className="flex items-center gap-2 text-sm">Sort
              <select value={sort} onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value as never }) })} className="field py-2 w-auto">
                <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="new">Newest</option><option value="best">Best Selling</option>
              </select>
            </label>
          </div>
          {list.length === 0 ? (
            <div className="text-center py-24 border rounded-lg bg-card"><p className="font-serif text-3xl">No sculptures match</p><p className="text-muted-foreground mt-2">Try adjusting your filters, or request a custom statue.</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{list.slice(0, shown).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
              {shown < list.length && <div className="text-center mt-12"><button onClick={() => setShown((s) => s + PAGE)} className="btn btn-outline">Load more</button></div>}
            </>
          )}
        </div>
      </div>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobile(false)} />
          <div className="absolute inset-y-0 right-0 w-80 max-w-[85%] bg-background p-6 overflow-y-auto">
            <div className="flex justify-between mb-6"><span className="font-serif text-2xl">Filters</span><button aria-label="Close filters" onClick={() => setMobile(false)}><X /></button></div>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}
