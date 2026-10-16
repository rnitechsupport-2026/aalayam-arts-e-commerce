import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct } from "./catalog";

export type CartLine = { slug: string; variantId: string; qty: number };

type Store = {
  cart: CartLine[];
  wishlist: string[];
  add: (slug: string, variantId: string, qty?: number) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  count: number;
};

const Ctx = createContext<Store | null>(null);

// Cart/wishlist persist in the browser for guests until account sync is added.
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("aa-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("aa-wish") || "[]"));
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("aa-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("aa-wish", JSON.stringify(wishlist)); }, [wishlist, ready]);

  const value: Store = {
    cart, wishlist,
    count: cart.reduce((s, l) => s + l.qty, 0),
    add: (slug, variantId, qty = 1) => {
      setCart((c) => {
        const ex = c.find((l) => l.slug === slug && l.variantId === variantId);
        return ex ? c.map((l) => (l === ex ? { ...l, qty: l.qty + qty } : l)) : [...c, { slug, variantId, qty }];
      });
      toast.success(`${getProduct(slug)?.name ?? "Item"} added to cart`);
    },
    setQty: (slug, variantId, qty) =>
      setCart((c) => c.map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, qty: Math.max(1, Math.min(20, qty)) } : l))),
    remove: (slug, variantId) => setCart((c) => c.filter((l) => !(l.slug === slug && l.variantId === variantId))),
    clear: () => setCart([]),
    toggleWish: (slug) =>
      setWish((w) => {
        const has = w.includes(slug);
        toast(has ? "Removed from wishlist" : "Saved to wishlist");
        return has ? w.filter((s) => s !== slug) : [...w, slug];
      }),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
};
