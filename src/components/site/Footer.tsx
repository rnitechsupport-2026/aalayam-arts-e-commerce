import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/catalog";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-x py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="text-4xl mt-2">Receive new arrivals & festival collections</h2>
        </div>
        <form className="flex gap-2" onSubmit={(e) => {
          e.preventDefault();
          if (!z.string().email().safeParse(email).success) return toast.error("Please enter a valid email");
          toast.success("Thank you — we'll be in touch."); setEmail("");
        }}>
          <label htmlFor="nl" className="sr-only">Email</label>
          <input id="nl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="field text-foreground" />
          <button className="btn btn-gold shrink-0">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const col = (title: string, links: { to: string; label: string; params?: Record<string, string> }[]) => (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-ivory/70">
        {links.map((l) => <li key={l.label}><Link to={l.to as "/"} params={l.params as never} className="hover:text-gold">{l.label}</Link></li>)}
      </ul>
    </div>
  );
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl text-gold">Aalayam Arts</p>
          <p className="mt-2 text-sm text-ivory/60 italic font-serif text-lg">Divinity Carved with Devotion</p>
          <p className="mt-6 text-sm text-ivory/60 max-w-sm">Temple statues, deity idols and custom sculptures for homes, temples and spaces of devotion worldwide.</p>
          <p className="mt-4 text-xs text-ivory/40">Workshop address, phone and GST details: to be added by the business.</p>
        </div>
        {col("Shop", [{ to: "/shop", label: "All Sculptures" }, { to: "/categories", label: "Categories" }, { to: "/custom-statues", label: "Custom Statues" }, { to: "/temple-projects", label: "Temple & Bulk" }])}
        {col("Help", [{ to: "/contact", label: "Contact Us" }, { to: "/info/$page", params: { page: "faq" }, label: "FAQ" }, { to: "/info/$page", params: { page: "shipping" }, label: "Shipping Policy" }, { to: "/info/$page", params: { page: "returns" }, label: "Returns & Refunds" }])}
        {col("Company", [{ to: "/about", label: "About Us" }, { to: "/info/$page", params: { page: "care" }, label: "Product Care" }, { to: "/info/$page", params: { page: "privacy" }, label: "Privacy Policy" }, { to: "/info/$page", params: { page: "terms" }, label: "Terms & Conditions" }])}
      </div>
      <div className="border-t border-ivory/10"><div className="container-x py-6 text-xs text-ivory/40 flex flex-col sm:flex-row justify-between gap-2"><span>© 2026 Aalayam Arts. All rights reserved.</span><span>Product listings shown are demonstration data.</span></div></div>
    </footer>
  );
}

export function WhatsAppFab() {
  const href = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Namaste, I have a question about a sculpture.")}` : undefined;
  return (
    <a
      href={href ?? "/contact"}
      target={href ? "_blank" : undefined}
      rel="noreferrer"
      onClick={(e) => { if (!href) { e.preventDefault(); toast.info("WhatsApp number not configured yet — please use the contact page."); } }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 size-14 rounded-full bg-success text-ivory grid place-items-center shadow-lift hover:scale-105 transition-transform"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
