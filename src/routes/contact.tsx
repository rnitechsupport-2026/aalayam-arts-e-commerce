import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ subject: z.string().max(200).optional() }),
  head: () => ({ meta: [{ title: "Contact Aalayam Arts" }, { name: "description", content: "Contact Aalayam Arts for sculpture enquiries, shipping quotes and temple projects." }, { property: "og:title", content: "Contact — Aalayam Arts" }, { property: "og:description", content: "Get in touch with our team." }] }),
  component: Contact,
});

const schema = z.object({ name: z.string().trim().min(2, "Name is required").max(100), email: z.string().trim().email("Valid email required").max(255), message: z.string().trim().min(5, "Message is required").max(1000) });

function Contact() {
  const { subject } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" />
      <div className="container-x py-16 grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div className="space-y-6">
          {[[MapPin, "Workshop", "Address to be added by the business"], [Phone, "Phone / WhatsApp", "To be added by the business"], [Mail, "Email", "To be added by the business"]].map(([I, t, d]) => {
            const Icon = I as typeof Mail;
            return <div key={t as string} className="flex gap-4"><Icon className="size-5 text-gold mt-1" /><div><p className="font-serif text-xl">{t as string}</p><p className="text-sm text-muted-foreground">{d as string}</p></div></div>;
          })}
        </div>
        <form noValidate className="bg-card border rounded-lg p-8 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
          if (!r.success) return setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
          setErrors({}); e.currentTarget.reset(); toast.success("Message received. We'll reply soon.");
        }}>
          {[["name", "Name"], ["email", "Email"]].map(([n, l]) => <div key={n}><label htmlFor={n} className="text-sm font-medium">{l}</label><input id={n} name={n} className="field mt-1" />{errors[n] && <p className="text-xs text-destructive mt-1">{errors[n]}</p>}</div>)}
          <div><label htmlFor="message" className="text-sm font-medium">Message</label><textarea id="message" name="message" rows={5} defaultValue={subject ? `${subject}\n\n` : ""} className="field mt-1" />{errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}</div>
          <button className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </>
  );
}
