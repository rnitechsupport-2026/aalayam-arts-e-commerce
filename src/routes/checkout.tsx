import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { formatINR } from "@/lib/catalog";
import { useCartTotals } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Aalayam Arts" }, { name: "description", content: "Secure checkout for your sculpture order." }, { property: "og:title", content: "Checkout — Aalayam Arts" }, { property: "og:description", content: "Complete your order." }] }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,15}$/, "Valid phone required"),
  address: z.string().trim().min(5, "Address is required").max(300),
  city: z.string().trim().min(2, "City is required").max(80),
  state: z.string().trim().min(2, "State is required").max(80),
  pin: z.string().trim().regex(/^[A-Za-z0-9 -]{4,10}$/, "Valid PIN / postal code required"),
  country: z.string().trim().min(2).max(60),
  notes: z.string().max(500).optional(),
});

function Checkout() {
  const { lines, subtotal, shipping, total } = useCartTotals(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [billingDiff, setBillingDiff] = useState(false);

  if (!lines.length) return <div className="container-x py-32 text-center"><h1 className="text-4xl">Nothing to check out</h1><Link to="/shop" className="btn btn-primary mt-6">Browse sculptures</Link></div>;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return toast.error("Please correct the highlighted fields");
    }
    setErrors({});
    // Payment provider not connected yet — we never simulate a successful payment.
    toast.info("Online payment is not connected yet. Your details are valid — order placement will be enabled once payments are set up.");
  };

  const F = ({ n, label, type = "text", full }: { n: string; label: string; type?: string; full?: boolean }) => (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={n} className="text-sm font-medium">{label}</label>
      <input id={n} name={n} type={type} defaultValue={n === "country" ? "India" : undefined} aria-invalid={!!errors[n]} className={`field mt-1 ${errors[n] ? "border-destructive" : ""}`} />
      {errors[n] && <p className="text-xs text-destructive mt-1">{errors[n]}</p>}
    </div>
  );

  return (
    <div className="container-x py-12">
      <h1 className="text-5xl mb-10">Checkout</h1>
      <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <fieldset className="grid sm:grid-cols-2 gap-4"><legend className="font-serif text-2xl mb-4">Contact</legend><F n="name" label="Full name" full /><F n="email" label="Email" type="email" /><F n="phone" label="Phone" type="tel" /></fieldset>
          <fieldset className="grid sm:grid-cols-2 gap-4"><legend className="font-serif text-2xl mb-4">Shipping address</legend><F n="address" label="Address" full /><F n="city" label="City" /><F n="state" label="State" /><F n="pin" label="PIN code" /><F n="country" label="Country" /></fieldset>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" checked={billingDiff} onChange={(e) => setBillingDiff(e.target.checked)} />Billing address is different</label>
          {billingDiff && <div><label htmlFor="billing" className="text-sm font-medium">Billing address</label><textarea id="billing" name="billing" rows={3} className="field mt-1" /></div>}
          <div><label htmlFor="notes" className="text-sm font-medium">Order notes (optional)</label><textarea id="notes" name="notes" rows={3} className="field mt-1" /></div>
          <div className="border rounded-lg p-5 bg-card">
            <p className="font-serif text-2xl">Payment</p>
            <p className="text-sm text-muted-foreground mt-2">Secure online payment (UPI, cards, net banking) will be available once the payment provider is connected. Payments will be verified on our server before any order is marked as paid.</p>
          </div>
        </div>
        <aside className="bg-card border rounded-lg p-6 h-fit space-y-3">
          <h2 className="text-2xl">Your order</h2>
          {lines.map((l) => <div key={l.slug + l.variantId} className="flex justify-between text-sm"><span>{l.p.name} ({l.v.label}) × {l.qty}</span><span>{formatINR(l.total)}</span></div>)}
          <div className="border-t pt-3 flex justify-between text-sm"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === null ? "Quoted separately" : shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
          <div className="flex justify-between font-semibold text-lg border-t pt-3"><span>Total</span><span className="text-primary">{formatINR(total)}</span></div>
          <button className="btn btn-primary w-full">Continue to Payment</button>
        </aside>
      </form>
    </div>
  );
}
