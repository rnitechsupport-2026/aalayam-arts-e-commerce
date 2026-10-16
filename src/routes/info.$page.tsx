import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FaqList } from "@/components/site/Faq";

const pages: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "Shipping Policy", body: ["We ship across India and internationally with insured carriers.", "Small and medium sculptures ship with standard rates shown at checkout. Free shipping applies above the threshold shown in your cart.", "Large, heavy or fragile sculptures (typically stone and temple-scale pieces) require a manual shipping quote based on dimensions, weight and destination. We'll confirm this with you before dispatch.", "Delivery estimates are indicative and may vary. Made-to-order items ship after production is complete."] },
  returns: { title: "Returns & Refunds", body: ["Please record an unboxing video and report any transit damage within 48 hours of delivery.", "Ready-made items may be returned unused in original packaging within 7 days, subject to inspection. Return shipping may apply.", "Custom and made-to-order sculptures are non-returnable except in case of transit damage.", "Approved refunds are processed to the original payment method. Final policy terms to be confirmed by the business."] },
  privacy: { title: "Privacy Policy", body: ["We collect only the information needed to process orders and enquiries: name, contact details, addresses and order history.", "Payment details are handled by our payment provider and never stored on our servers.", "We do not sell your personal data. You may request access to or deletion of your data by contacting us."] },
  terms: { title: "Terms & Conditions", body: ["Product images are representative; handcrafted and cast pieces may show natural variation.", "Prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise.", "Custom orders proceed only after written approval of a quotation. Full terms to be provided by the business."] },
  care: { title: "Product Care", body: ["Bronze & brass: wipe with a soft dry cloth. Avoid harsh chemicals; use tamarind or a mild brass cleaner sparingly for polished finishes.", "Stone: clean with water and a soft brush. Abhishekam residue should be rinsed promptly.", "Place heavy sculptures on stable, level surfaces and lift from the base."] },
  faq: { title: "Frequently Asked Questions", body: [] },
};

export const Route = createFileRoute("/info/$page")({
  loader: ({ params }) => { if (!pages[params.page]) throw notFound(); return { page: params.page }; },
  head: ({ loaderData }) => {
    const t = loaderData ? pages[loaderData.page].title : "Information";
    return { meta: [{ title: `${t} — Aalayam Arts` }, { name: "description", content: `${t} for Aalayam Arts temple sculptures.` }, { property: "og:title", content: `${t} — Aalayam Arts` }, { property: "og:description", content: `${t} for Aalayam Arts.` }] };
  },
  component: Info,
});

function Info() {
  const { page } = Route.useLoaderData();
  const p = pages[page];
  return (
    <>
      <PageHero eyebrow="Information" title={p.title} />
      <div className="container-x max-w-3xl py-16 space-y-5 text-muted-foreground leading-relaxed">
        {page === "faq" ? <FaqList /> : p.body.map((b) => <p key={b}>{b}</p>)}
      </div>
    </>
  );
}
