import { createFileRoute, Link } from "@tanstack/react-router";
import murugan from "@/assets/murugan-stone.jpg";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/temple-projects")({
  head: () => ({ meta: [{ title: "Temple Projects & Bulk Orders — Aalayam Arts" }, { name: "description", content: "Sanctum idols, utsava murtis and bulk sculpture orders for temples, resellers and architects." }, { property: "og:title", content: "Temple Projects — Aalayam Arts" }, { property: "og:description", content: "Temple-scale sculptures and bulk orders." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Temple Projects" title="Sculptures for Sacred Spaces" sub="Partnering with temple committees, architects and resellers on sanctum idols, utsava murtis and complete sculpture programmes." />
      <section className="container-x py-20 grid md:grid-cols-2 gap-12 items-center">
        <img src={murugan} alt="Temple stone sculpture" loading="lazy" className="rounded-lg aspect-[4/5] object-cover w-full" />
        <div className="space-y-6">
          {[["Temple committees", "Moolavar and utsava idols to agama specifications, with consultation on dimensions and iconography."], ["Pooja shops & resellers", "Trade pricing on brass and bronze idols in bulk quantities."], ["Architects & designers", "Statement sculptures for residences, hotels and cultural spaces."]].map(([t, d]) => (
            <div key={t} className="border-l-2 border-gold pl-5"><h2 className="text-3xl">{t}</h2><p className="text-muted-foreground mt-2">{d}</p></div>
          ))}
          <div className="flex gap-3 pt-4"><Link to="/custom-statues" className="btn btn-primary">Submit Requirement</Link><Link to="/contact" className="btn btn-outline">Contact Us</Link></div>
        </div>
      </section>
    </>
  ),
});
