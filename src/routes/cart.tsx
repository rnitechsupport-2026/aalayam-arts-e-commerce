import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DEMO_COUPONS, formatINR, getProduct, shippingFor, SHIPPING_FREE_ABOVE } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Aalayam Arts" }, { name: "description", content: "Review the sculptures in your cart." }, { property: "og:title", content: "Cart — Aalayam Arts" }, { property: "og:description", content: "Your selected sculptures." }] }),
  component: Cart,
});

export function useCartTotals(coupon: string | null) {
  const { cart } = useStore();
  const lines = cart.flatMap((l) => {
    const p = getProduct(l.slug); const v = p?.variants.find((x) => x.id === l.variantId);
    return p && v ? [{ ...l, p, v, total: v.price * l.qty }] : [];
  });
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const discount = coupon && DEMO_COUPONS[coupon] ? Math.round(subtotal * DEMO_COUPONS[coupon]) : 0;
  const shipping = shippingFor(subtotal, lines.some((l) => l.p.largeItem));
  return { lines, subtotal, discount, shipping, total: subtotal - discount + (shipping ?? 0) };
}

function Cart() {
  const { setQty, remove } = useStore();
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const { lines, subtotal, discount, shipping, total } = useCartTotals(coupon);

  if (!lines.length) return (
    <div className="container-x py-32 text-center"><h1 className="text-5xl">Your cart is empty</h1><p className="text-muted-foreground mt-4">Begin with a sculpture that speaks to you.</p><Link to="/shop" className="btn btn-primary mt-8">Continue Shopping</Link></div>
  );

  return (
    <div className="container-x py-12">
      <h1 className="text-5xl mb-10">Shopping Cart</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <ul className="divide-y border-y">
          {lines.map((l) => (
            <li key={l.slug + l.variantId} className="py-6 flex gap-5">
              <img src={l.p.images[0]} alt={l.p.name} className="size-28 rounded object-cover" />
              <div className="flex-1">
                <Link to="/product/$slug" params={{ slug: l.slug }} className="font-serif text-2xl hover:text-primary">{l.p.name}</Link>
                <p className="text-sm text-muted-foreground">{l.p.material} · Height {l.v.label}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded">
                    <button aria-label="Decrease" onClick={() => setQty(l.slug, l.variantId, l.qty - 1)} className="p-2"><Minus className="size-3" /></button>
                    <span className="w-8 text-center text-sm">{l.qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(l.slug, l.variantId, l.qty + 1)} className="p-2"><Plus className="size-3" /></button>
                  </div>
                  <span className="font-semibold">{formatINR(l.total)}</span>
                </div>
              </div>
              <button aria-label="Remove item" onClick={() => { if (confirm("Remove this item from your cart?")) remove(l.slug, l.variantId); }} className="self-start text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
            </li>
          ))}
        </ul>
        <aside className="bg-card border rounded-lg p-6 h-fit space-y-4">
          <h2 className="text-2xl">Order Summary</h2>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const c = code.trim().toUpperCase(); if (DEMO_COUPONS[c]) { setCoupon(c); toast.success("Coupon applied"); } else toast.error("Invalid coupon code"); }}>
            <label htmlFor="coupon" className="sr-only">Discount code</label>
            <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} className="field" placeholder="Discount code (try DIVINE10)" />
            <button className="btn btn-outline py-2">Apply</button>
          </form>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-success"><dt>Discount ({coupon})</dt><dd>−{formatINR(discount)}</dd></div>}
            <div className="flex justify-between"><dt>Shipping estimate</dt><dd>{shipping === null ? "Quoted separately" : shipping === 0 ? "Free" : formatINR(shipping)}</dd></div>
          </dl>
          {shipping === null && <p className="text-xs text-muted-foreground">Your cart includes a large sculpture; shipping will be confirmed manually before dispatch.</p>}
          {shipping !== null && shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping above {formatINR(SHIPPING_FREE_ABOVE)}.</p>}
          <div className="flex justify-between border-t pt-4 text-lg font-semibold"><span>Total</span><span className="text-primary">{formatINR(total)}</span></div>
          <Link to="/checkout" className="btn btn-primary w-full">Proceed to Checkout</Link>
          <Link to="/shop" className="btn btn-outline w-full">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
