import ganesha from "@/assets/ganesha.jpg";
import murugan from "@/assets/murugan-stone.jpg";
import lakshmi from "@/assets/lakshmi-brass.jpg";
import nataraja from "@/assets/hero-nataraja.jpg";

/**
 * DEMONSTRATION DATA — sample products only, not real inventory.
 * Material claims (bronze, brass, granite) describe the sample listing and must
 * be verified by the business before going live.
 */

export type Category = { slug: string; name: string; image: string; blurb: string };
export type Variant = { id: string; label: string; height: string; price: number };
export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: string;
  deity: string;
  material: "Bronze" | "Brass" | "Granite" | "Marble" | "Panchaloha";
  style: "South Indian" | "Chola" | "Contemporary" | "Hoysala";
  finish: string;
  images: string[];
  variants: Variant[];
  width: string;
  depth: string;
  weight: string;
  stock: number;
  madeToOrder: boolean;
  productionTime?: string;
  largeItem: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  sold: number;
  addedAt: string;
  description: string;
  craft: string;
  rating: number;
  reviews: number;
};

export const categories: Category[] = [
  { slug: "ganesha", name: "Ganesha Statues", image: ganesha, blurb: "Remover of obstacles" },
  { slug: "murugan", name: "Lord Murugan Statues", image: murugan, blurb: "Divine warrior of Kailash" },
  { slug: "shiva-nataraja", name: "Shiva & Nataraja", image: nataraja, blurb: "The cosmic dance" },
  { slug: "lakshmi-vishnu", name: "Lakshmi & Vishnu", image: lakshmi, blurb: "Prosperity and preservation" },
  { slug: "bronze-panchaloha", name: "Bronze & Panchaloha", image: nataraja, blurb: "Lost-wax cast idols" },
  { slug: "granite-stone", name: "Granite & Stone", image: murugan, blurb: "Temple-grade carvings" },
  { slug: "brass-pooja", name: "Brass Pooja Idols", image: lakshmi, blurb: "For the home altar" },
  { slug: "custom-temple", name: "Custom Temple Sculptures", image: ganesha, blurb: "Made to your specification" },
];

const v = (base: number, sizes: [string, number][]): Variant[] =>
  sizes.map(([h, mult], i) => ({ id: `v${i}`, label: h, height: h, price: Math.round((base * mult) / 100) * 100 }));

export const products: Product[] = [
  {
    slug: "seated-ganesha-bronze", sku: "AA-GAN-001", name: "Seated Ganesha on Lotus Pedestal",
    category: "ganesha", deity: "Ganesha", material: "Bronze", style: "South Indian", finish: "Antique patina",
    images: [ganesha, lakshmi, murugan], variants: v(18500, [["12 in", 1], ["18 in", 1.8], ["24 in", 2.9]]),
    width: "8 in", depth: "6 in", weight: "4.2 kg", stock: 12, madeToOrder: false, largeItem: false,
    featured: true, bestSeller: true, sold: 142, addedAt: "2026-06-01", rating: 4.9, reviews: 38,
    description: "A serene four-armed Ganesha seated in lalitasana upon a double lotus pedestal, holding the axe, noose, modak and abhaya mudra.",
    craft: "Sample listing: cast and finished by hand, with detailing on the crown, jewellery and lotus petals. Final craftsmanship details to be confirmed by the workshop.",
  },
  {
    slug: "murugan-with-peacock-granite", sku: "AA-MUR-014", name: "Standing Murugan with Vel & Peacock",
    category: "murugan", deity: "Murugan", material: "Granite", style: "South Indian", finish: "Natural black stone",
    images: [murugan, ganesha], variants: v(64000, [["24 in", 1], ["36 in", 1.9], ["48 in", 3.2]]),
    width: "10 in", depth: "7 in", weight: "38 kg", stock: 3, madeToOrder: false, largeItem: true,
    featured: true, sold: 21, addedAt: "2026-08-10", rating: 4.8, reviews: 9,
    description: "Lord Murugan stands in samabhanga holding his vel, accompanied by his peacock mount. Suitable for home shrines and temple sanctums.",
    craft: "Sample listing: carved from a single block of black stone with fine detailing on the kireeta and ornaments.",
  },
  {
    slug: "lakshmi-on-lotus-brass", sku: "AA-LAK-007", name: "Goddess Lakshmi on Blooming Lotus",
    category: "lakshmi-vishnu", deity: "Lakshmi", material: "Brass", style: "Contemporary", finish: "Polished gold",
    images: [lakshmi, ganesha], variants: v(12800, [["10 in", 1], ["15 in", 1.7]]),
    width: "7 in", depth: "5 in", weight: "3.1 kg", stock: 24, madeToOrder: false, largeItem: false,
    featured: true, bestSeller: true, newArrival: true, sold: 210, addedAt: "2026-09-20", rating: 4.9, reviews: 54,
    description: "Mahalakshmi seated on a full-bloom lotus, holding lotuses in her upper hands with abhaya and varada mudras.",
    craft: "Sample listing: brass with high-polish finish and engraved ornament detailing.",
  },
  {
    slug: "chola-nataraja-bronze", sku: "AA-NAT-002", name: "Chola-Style Nataraja in Prabha",
    category: "shiva-nataraja", deity: "Shiva", material: "Bronze", style: "Chola", finish: "Antique bronze",
    images: [nataraja, ganesha], variants: v(42000, [["18 in", 1], ["24 in", 1.6], ["36 in", 2.8]]),
    width: "15 in", depth: "6 in", weight: "9.5 kg", stock: 0, madeToOrder: true, productionTime: "6–8 weeks",
    largeItem: true, featured: true, bestSeller: true, sold: 64, addedAt: "2026-05-14", rating: 5, reviews: 22,
    description: "Shiva as the Lord of Dance within the flaming prabha, the timeless icon of cosmic creation and dissolution.",
    craft: "Sample listing: made-to-order. Method and alloy to be confirmed by the workshop when quoting.",
  },
  {
    slug: "brass-ganesha-pooja", sku: "AA-GAN-021", name: "Brass Pooja Ganesha",
    category: "brass-pooja", deity: "Ganesha", material: "Brass", style: "Contemporary", finish: "Satin gold",
    images: [ganesha], variants: v(3400, [["6 in", 1], ["8 in", 1.5]]),
    width: "4 in", depth: "3 in", weight: "0.9 kg", stock: 40, madeToOrder: false, largeItem: false,
    newArrival: true, sold: 320, addedAt: "2026-10-01", rating: 4.7, reviews: 71,
    description: "A compact Ganesha for the home altar, ideal for daily pooja and gifting.",
    craft: "Sample listing: brass with satin finish.",
  },
  {
    slug: "granite-ganesha-temple", sku: "AA-GAN-033", name: "Temple Granite Vinayagar",
    category: "granite-stone", deity: "Ganesha", material: "Granite", style: "Hoysala", finish: "Natural stone",
    images: [ganesha, murugan], variants: v(85000, [["30 in", 1], ["42 in", 1.9]]),
    width: "20 in", depth: "14 in", weight: "120 kg", stock: 0, madeToOrder: true, productionTime: "10–14 weeks",
    largeItem: true, sold: 8, addedAt: "2026-07-03", rating: 4.8, reviews: 4,
    description: "A temple-scale Vinayagar for sanctum installation, carved to traditional proportions.",
    craft: "Sample listing: made-to-order to your temple's specifications.",
  },
  {
    slug: "vishnu-lakshmi-pair-brass", sku: "AA-VIS-004", name: "Vishnu & Lakshmi Pair",
    category: "lakshmi-vishnu", deity: "Vishnu", material: "Brass", style: "South Indian", finish: "Antique gold",
    images: [lakshmi, nataraja], variants: v(26500, [["12 in", 1], ["18 in", 1.75]]),
    width: "14 in", depth: "6 in", weight: "6.8 kg", stock: 5, madeToOrder: false, largeItem: false,
    newArrival: true, sold: 33, addedAt: "2026-09-28", rating: 4.8, reviews: 11,
    description: "Lord Vishnu with Goddess Lakshmi, a pair for prosperity and harmony in the home shrine.",
    craft: "Sample listing: brass with antique gold finish.",
  },
  {
    slug: "panchaloha-murugan", sku: "AA-MUR-009", name: "Bala Murugan Idol",
    category: "bronze-panchaloha", deity: "Murugan", material: "Bronze", style: "Chola", finish: "Temple patina",
    images: [murugan, nataraja], variants: v(22000, [["10 in", 1], ["14 in", 1.6]]),
    width: "6 in", depth: "4 in", weight: "3.4 kg", stock: 2, madeToOrder: false, largeItem: false,
    bestSeller: true, sold: 88, addedAt: "2026-04-22", rating: 4.9, reviews: 19,
    description: "Young Murugan in a graceful standing posture. Alloy composition to be confirmed by the workshop.",
    craft: "Sample listing: cast bronze with patina finish.",
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const minPrice = (p: Product) => Math.min(...p.variants.map((x) => x.price));
export const availability = (p: Product) =>
  p.madeToOrder ? `Made to order · ${p.productionTime}` : p.stock === 0 ? "Out of stock" : p.stock <= 3 ? `Only ${p.stock} left` : "In stock";

export const SHIPPING_FREE_ABOVE = 25000;
export const shippingFor = (subtotal: number, hasLarge: boolean) =>
  hasLarge ? null : subtotal === 0 || subtotal >= SHIPPING_FREE_ABOVE ? 0 : 750;

/** Demo coupon codes — real coupons will be validated on the server once the backend is connected. */
export const DEMO_COUPONS: Record<string, number> = { DIVINE10: 0.1 };

/** Configure the WhatsApp number via VITE_WHATSAPP_NUMBER (digits, country code first). */
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "";
