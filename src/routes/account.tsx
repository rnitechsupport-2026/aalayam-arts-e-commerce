import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Aalayam Arts" }, { name: "description", content: "Sign in to view orders, addresses and enquiries." }, { property: "og:title", content: "My Account — Aalayam Arts" }, { property: "og:description", content: "Customer account." }] }),
  component: Account,
});

function Account() {
  return (
    <>
      <PageHero eyebrow="Account" title="Welcome" sub="Customer sign-in, order history, saved addresses and enquiry tracking are being enabled." />
      <div className="container-x py-16 max-w-xl text-center">
        <p className="text-muted-foreground">Until then, you can continue shopping as a guest. Your cart and wishlist are kept on this device.</p>
        <div className="flex gap-3 justify-center mt-8"><Link to="/shop" className="btn btn-primary">Shop now</Link><Link to="/wishlist" className="btn btn-outline">View wishlist</Link></div>
      </div>
    </>
  );
}
