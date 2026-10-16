import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/custom-statues", label: "Custom Statues" },
  { to: "/temple-projects", label: "Temple Projects" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
    setSearchOpen(false); setOpen(false);
  };

  return (
    <>
      <div className="bg-ink text-gold-soft text-[0.7rem] tracking-[0.2em] uppercase text-center py-2 px-4">
        Handcrafted Divine Sculptures <span className="text-gold mx-2">✦</span> Custom Orders Available <span className="text-gold mx-2 hidden sm:inline">✦</span><span className="hidden sm:inline"> Secure Shipping</span>
      </div>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container-x flex items-center justify-between h-18 py-4 gap-4">
          <button className="lg:hidden p-2 -ml-2" aria-label="Open menu" onClick={() => setOpen(true)}><Menu className="size-5" /></button>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid place-items-center size-10 rounded-full border border-gold text-primary font-serif text-xl">ஆ</span>
            <span className="leading-tight">
              <span className="block font-serif text-2xl text-primary">Aalayam Arts</span>
              <span className="hidden sm:block text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Divinity Carved with Devotion</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm text-foreground/80 hover:text-primary transition-colors" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:text-primary" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}><Search className="size-5" /></button>
            <Link to="/account" className="p-2 hover:text-primary hidden sm:block" aria-label="Account"><User className="size-5" /></Link>
            <Link to="/wishlist" className="p-2 hover:text-primary relative" aria-label="Wishlist">
              <Heart className="size-5" />
              {wishlist.length > 0 && <span className="absolute top-0 right-0 size-4 grid place-items-center rounded-full bg-gold text-ink text-[0.6rem] font-bold">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="p-2 hover:text-primary relative" aria-label="Cart">
              <ShoppingBag className="size-5" />
              {count > 0 && <span className="absolute top-0 right-0 size-4 grid place-items-center rounded-full bg-primary text-primary-foreground text-[0.6rem] font-bold">{count}</span>}
            </Link>
          </div>
        </div>
        {searchOpen && (
          <form onSubmit={submit} className="container-x pb-4 animate-in fade-in slide-in-from-top-2">
            <label htmlFor="site-search" className="sr-only">Search sculptures</label>
            <input id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} className="field" placeholder="Search Ganesha, bronze, Nataraja…" />
          </form>
        )}
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] bg-background p-6 animate-in slide-in-from-left">
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-2xl text-primary">Aalayam Arts</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}><X className="size-5" /></button>
            </div>
            <form onSubmit={submit} className="mb-6"><input value={q} onChange={(e) => setQ(e.target.value)} className="field" placeholder="Search…" aria-label="Search" /></form>
            <nav className="flex flex-col">
              {[...nav, { to: "/account", label: "My Account" } as const].map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 border-b font-serif text-xl">{n.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
