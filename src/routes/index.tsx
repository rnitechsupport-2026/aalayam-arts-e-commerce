import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Hammer, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import hero from "@/assets/hero-nataraja.jpg";
import murugan from "@/assets/murugan-stone.jpg";
import ganesha from "@/assets/ganesha.jpg";
import { categories, products } from "@/lib/catalog";
import { ProductCard, SectionHead } from "@/components/site/ProductCard";
import { Newsletter } from "@/components/site/Footer";
import { FaqList } from "@/components/site/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aalayam Arts — Bring Divinity Into Your Space" },
      { name: "description", content: "Temple statues, bronze and brass deity idols, stone sculptures and custom temple sculptures from Aalayam Arts." },
      { property: "og:title", content: "Aalayam Arts — Divinity Carved with Devotion" },
      { property: "og:description", content: "Discover timeless temple sculptures crafted with devotion, tradition and artistry." },
    ],
  }),
  component: Home,
});

const reviews = [
  { name: "Lakshmi R., Chennai", text: "The Ganesha arrived beautifully packed and is even more detailed in person. It now sits at the heart of our home." },
  { name: "Sri Venkateswara Temple Committee", text: "Clear communication on dimensions and timeline for our sanctum idol. Highly professional." },
  { name: "Arjun M., New Jersey", text: "International delivery was handled with care. The team guided us through every step." },
];

function Home() {
  const featured = products.filter((p) => p.featured);
  const best = products.filter((p) => p.bestSeller).slice(0, 4);
  const fresh = products.filter((p) => p.newArrival).slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-ink">
        <img src={hero} alt="Bronze Nataraja statue in a ring of fire" width={1920} height={1088} className="absolute inset-0 size-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="container-x relative py-24">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="eyebrow">Aalayam Arts · Est. Tradition</p>
            <h1 className="text-5xl md:text-7xl text-ivory mt-5 leading-[1.05]">Bring Divinity Into Your <em className="text-gold">Space</em></h1>
            <p className="text-ivory/75 text-lg mt-6 max-w-md">Discover timeless temple sculptures crafted with devotion, tradition and exceptional artistry.</p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link to="/shop" className="btn btn-gold">Explore Collection <ArrowRight className="size-4" /></Link>
              <Link to="/custom-statues" className="btn btn-ghost-light">Request Custom Statue</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b bg-card">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-8 text-sm">
          {[[Hammer, "Traditional workmanship"], [ShieldCheck, "Secure payments"], [Truck, "Insured shipping"], [PackageCheck, "Custom orders welcome"]].map(([I, t]) => {
            const Icon = I as typeof Hammer;
            return <div key={t as string} className="flex items-center gap-3"><Icon className="size-5 text-gold" /><span>{t as string}</span></div>;
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-24">
        <SectionHead eyebrow="Shop by Category" title="Sacred Collections" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ cat: c.slug }} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-ink">
              <img src={c.image} alt={c.name} loading="lazy" className="size-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 p-4 md:p-5">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-gold">{c.blurb}</p>
                <h3 className="text-ivory text-xl md:text-2xl mt-1">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-card border-y py-24">
        <div className="container-x">
          <SectionHead eyebrow="Featured" title="Masterpieces of the Season" sub="Sample listings shown for demonstration until real inventory is added." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{featured.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      {/* Custom services */}
      <section className="container-x py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={murugan} alt="Stone Murugan sculpture" loading="lazy" className="rounded-lg aspect-[4/5] object-cover w-full shadow-lift" />
          <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-primary-foreground p-6 rounded-lg max-w-[14rem]">
            <p className="font-serif text-4xl text-gold">1 : 1</p><p className="text-sm mt-1">Every custom piece is discussed with you before carving begins.</p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Custom Sculpture Services</p>
          <h2 className="text-4xl md:text-5xl mt-3">Your vision, carved by master hands</h2>
          <p className="text-muted-foreground mt-6">Commission a deity in the material, size and iconography you require — from a home altar idol to a temple moolavar. Share references, and our team will prepare a quotation and production timeline for your approval.</p>
          <ol className="mt-8 space-y-4">
            {["Share your requirement", "Receive quotation & timeline", "Approve & production begins", "Insured delivery"].map((s, i) => (
              <li key={s} className="flex gap-4 items-center"><span className="size-8 grid place-items-center rounded-full border border-gold text-primary font-serif">{i + 1}</span>{s}</li>
            ))}
          </ol>
          <Link to="/custom-statues" className="btn btn-primary mt-10">Start a Custom Enquiry</Link>
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-x pb-24">
        <div className="flex items-end justify-between mb-10"><div><p className="eyebrow">Most loved</p><h2 className="text-4xl mt-2">Best Sellers</h2></div><Link to="/shop" search={{ sort: "best" }} className="text-sm text-primary border-b border-gold">View all</Link></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{best.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-ink text-ivory py-24">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow">Our Artisan Craftsmanship</p>
            <h2 className="text-4xl md:text-5xl mt-3">Rooted in the Shilpa Shastras</h2>
            <p className="text-ivory/70 mt-6">Our partner sthapatis follow proportions and iconography handed down across generations. Each sculpture passes through modelling, casting or carving, chasing and finishing before careful inspection.</p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[["Bronze", "Lost-wax"], ["Stone", "Hand-chiselled"], ["Brass", "Cast & polished"]].map(([a, b]) => <div key={a} className="border-t border-gold/40 pt-4"><p className="font-serif text-2xl text-gold">{a}</p><p className="text-xs text-ivory/60 mt-1">{b}</p></div>)}
            </div>
          </div>
          <img src={ganesha} alt="Bronze Ganesha detail" loading="lazy" className="rounded-lg aspect-square object-cover w-full" />
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x py-24">
        <div className="flex items-end justify-between mb-10"><div><p className="eyebrow">Just arrived</p><h2 className="text-4xl mt-2">New Arrivals</h2></div><Link to="/shop" search={{ sort: "new" }} className="text-sm text-primary border-b border-gold">View all</Link></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{fresh.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      {/* Temple & bulk */}
      <section className="container-x pb-24">
        <div className="rounded-lg bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div><Building2 className="size-8 text-gold" /><h2 className="text-4xl mt-4">Temple & Bulk Orders</h2><p className="text-ivory/75 mt-3 max-w-xl">For temple committees, pooja shops, resellers and architects — dedicated project support, sanctum-scale sculptures and trade pricing.</p></div>
          <Link to="/temple-projects" className="btn btn-gold">Discuss a Project</Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-card border-y py-24">
        <div className="container-x">
          <SectionHead eyebrow="Why Aalayam Arts" title="A showroom built on trust" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[[Award, "Authentic iconography", "Proportions and attributes guided by traditional texts."], [ShieldCheck, "Transparent details", "Material, size and weight stated clearly on every listing."], [Truck, "Careful shipping", "Crated packing for fragile and heavy sculptures."], [Hammer, "Custom capability", "From 6-inch altar idols to temple-scale carvings."]].map(([I, t, d]) => {
              const Icon = I as typeof Award;
              return <div key={t as string} className="text-center"><div className="mx-auto size-14 grid place-items-center rounded-full border border-gold"><Icon className="size-6 text-primary" /></div><h3 className="text-2xl mt-5">{t as string}</h3><p className="text-sm text-muted-foreground mt-2">{d as string}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-x py-24">
        <SectionHead eyebrow="Customer Reviews" title="Words of devotion" sub="Sample testimonials for demonstration." />
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={r.name} className="bg-card border rounded-lg p-8 shadow-soft">
              <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
              <blockquote className="font-serif text-xl mt-4 leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="text-sm text-muted-foreground mt-6">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x pb-24 max-w-3xl">
        <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
        <FaqList />
      </section>

      <Newsletter />
    </>
  );
}
