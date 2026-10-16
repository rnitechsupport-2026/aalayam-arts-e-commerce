import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/catalog";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Sculpture Categories — Aalayam Arts" }, { name: "description", content: "Browse Ganesha, Murugan, Nataraja, Lakshmi, bronze, brass and stone sculpture collections." }, { property: "og:title", content: "Categories — Aalayam Arts" }, { property: "og:description", content: "Explore our sacred collections." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Categories" title="Sacred Collections" />
      <div className="container-x py-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <Link key={c.slug} to="/shop" search={{ cat: c.slug }} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-ink">
            <img src={c.image} alt={c.name} loading="lazy" className="size-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
            <h2 className="absolute bottom-4 left-4 right-4 text-ivory text-2xl">{c.name}</h2>
          </Link>
        ))}
      </div>
    </>
  ),
});
