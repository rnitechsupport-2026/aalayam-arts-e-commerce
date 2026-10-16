import { ChevronDown } from "lucide-react";

export const faqs = [
  ["Do you take custom orders?", "Yes. Submit a custom statue enquiry with your deity, material, size and references. We'll review and send a quotation and estimated timeline for your approval."],
  ["Do you ship internationally?", "Yes, we ship to many countries. For large or heavy sculptures, shipping is quoted manually based on dimensions, weight and destination."],
  ["How are fragile sculptures packed?", "Sculptures are wrapped in protective layers and packed in wooden crates or reinforced boxes depending on size."],
  ["Are listed materials verified?", "Every product page states the material. For specific alloy compositions (such as Panchaloha) or certifications, please ask us — we only confirm what the workshop has verified."],
  ["Can temples order in bulk?", "Absolutely. Visit our Temple Projects page to discuss sanctum idols, utsava murtis and bulk requirements."],
];

export function FaqList() {
  return (
    <div className="divide-y border-y">
      {faqs.map(([q, a]) => (
        <details key={q} className="group py-5">
          <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-xl">{q}<ChevronDown className="size-5 text-gold group-open:rotate-180 transition-transform" /></summary>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{a}</p>
        </details>
      ))}
    </div>
  );
}
