import { createFileRoute } from "@tanstack/react-router";
import ganesha from "@/assets/ganesha.jpg";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Aalayam Arts — Our Story" }, { name: "description", content: "The story, values and craftsmanship behind Aalayam Arts temple sculptures." }, { property: "og:title", content: "About — Aalayam Arts" }, { property: "og:description", content: "Divinity carved with devotion." }] }),
  component: () => (
    <>
      <PageHero eyebrow="About Us" title="Divinity Carved with Devotion" />
      <section className="container-x py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p className="font-serif text-2xl text-foreground">Aalayam — the abode of the divine.</p>
          <p>Aalayam Arts brings traditional Indian temple sculpture to homes, temples and spaces of devotion around the world, working with artisans who carry forward centuries-old techniques.</p>
          <p>We believe a sacred image deserves honesty: clear materials, accurate sizes and careful guidance at every step, from selection to installation.</p>
          <p className="text-xs">Founder story, workshop location and artisan details: to be provided by the business.</p>
        </div>
        <img src={ganesha} alt="Bronze Ganesha" loading="lazy" className="rounded-lg aspect-square object-cover w-full" />
      </section>
    </>
  ),
});
