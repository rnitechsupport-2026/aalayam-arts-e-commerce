import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Aalayam Arts" }, { name: "description", content: "Sculptures you've saved." }, { property: "og:title", content: "Wishlist — Aalayam Arts" }, { property: "og:description", content: "Your saved sculptures." }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));
  return (
    <div className="container-x py-12">
      <h1 className="text-5xl mb-10">Your Wishlist</h1>
      {items.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{items.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        : <div className="text-center py-24"><p className="text-muted-foreground">You haven't saved any sculptures yet.</p><Link to="/shop" className="btn btn-primary mt-6">Explore Collection</Link></div>}
    </div>
  );
}
