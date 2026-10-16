import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/custom-statues")({
  head: () => ({ meta: [{ title: "Custom Statues — Commission a Sculpture | Aalayam Arts" }, { name: "description", content: "Commission a custom deity idol or temple sculpture in bronze, brass or stone. Submit an enquiry for a quotation." }, { property: "og:title", content: "Custom Temple Statues — Aalayam Arts" }, { property: "og:description", content: "Commission a sculpture made to your specification." }] }),
  component: CustomPage,
});

const steps = ["Your details", "Sculpture", "Delivery & budget", "Review"] as const;
const stepSchemas = [
  z.object({ name: z.string().trim().min(2, "Name is required").max(100), phone: z.string().trim().regex(/^[+\d][\d\s-]{7,15}$/, "Valid phone required"), email: z.string().trim().email("Valid email required").max(255) }),
  z.object({ deity: z.string().trim().min(2, "Deity / sculpture is required").max(120), material: z.string().min(1, "Select a material"), height: z.string().trim().min(1, "Height is required").max(80), quantity: z.coerce.number().int().min(1, "At least 1").max(500), use: z.string().min(1, "Select intended use") }),
  z.object({ location: z.string().trim().min(2, "Delivery location is required").max(200), budget: z.string().min(1, "Select a budget range"), date: z.string().optional(), notes: z.string().max(1000).optional() }),
];

type Form = Record<string, string>;

function CustomPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ quantity: "1" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [ref, setRef] = useState<string | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const next = () => {
    const r = stepSchemas[step]?.safeParse(form);
    if (r && !r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({}); setStep(step + 1);
  };
  const submit = () => {
    const id = `AAE-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setRef(id);
    toast.success("Enquiry prepared");
  };

  const Err = ({ k }: { k: string }) => errors[k] ? <p className="text-xs text-destructive mt-1">{errors[k]}</p> : null;
  const Input = ({ k, label, type = "text" }: { k: string; label: string; type?: string }) => (
    <div><label htmlFor={k} className="text-sm font-medium">{label}</label><input id={k} type={type} value={form[k] ?? ""} onChange={set(k)} className={`field mt-1 ${errors[k] ? "border-destructive" : ""}`} /><Err k={k} /></div>
  );
  const Select = ({ k, label, opts }: { k: string; label: string; opts: string[] }) => (
    <div><label htmlFor={k} className="text-sm font-medium">{label}</label><select id={k} value={form[k] ?? ""} onChange={set(k)} className={`field mt-1 ${errors[k] ? "border-destructive" : ""}`}><option value="">Select…</option>{opts.map((o) => <option key={o}>{o}</option>)}</select><Err k={k} /></div>
  );

  return (
    <>
      <PageHero eyebrow="Custom Statues" title="Commission a Sacred Sculpture" sub="Tell us the deity, material and size you envision. Our team will review your requirement and prepare a quotation and timeline for your approval." />
      <div className="container-x py-16 max-w-3xl">
        {ref ? (
          <div className="text-center bg-card border rounded-lg p-12">
            <div className="mx-auto size-16 rounded-full bg-success/15 grid place-items-center"><Check className="size-8 text-success" /></div>
            <h2 className="text-4xl mt-6">Thank you, {form.name}</h2>
            <p className="text-muted-foreground mt-3">Your enquiry reference is</p>
            <p className="font-serif text-3xl text-primary mt-1">{ref}</p>
            <p className="text-sm text-muted-foreground mt-6 max-w-md mx-auto">Status: <strong>Submitted</strong>. A quotation and completion date will only be shared after our team has reviewed and approved them.</p>
            <p className="text-xs text-muted-foreground mt-4">Note: enquiry storage and tracking are being connected — keep this reference for now.</p>
          </div>
        ) : (
          <>
            <ol className="flex justify-between mb-10">
              {steps.map((s, i) => (
                <li key={s} className="flex-1 flex flex-col items-center text-center">
                  <span className={`size-9 rounded-full grid place-items-center border ${i <= step ? "bg-primary text-primary-foreground border-primary" : "border-gold text-muted-foreground"}`}>{i < step ? <Check className="size-4" /> : i + 1}</span>
                  <span className="text-xs mt-2 hidden sm:block">{s}</span>
                </li>
              ))}
            </ol>
            <div className="bg-card border rounded-lg p-6 md:p-10 space-y-5">
              {step === 0 && <><Input k="name" label="Full name *" /><div className="grid sm:grid-cols-2 gap-5"><Input k="phone" label="Phone *" type="tel" /><Input k="email" label="Email *" type="email" /></div></>}
              {step === 1 && <>
                <Input k="deity" label="Deity or sculpture name *" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Select k="material" label="Material *" opts={["Bronze", "Brass", "Panchaloha (subject to workshop confirmation)", "Granite / Stone", "Marble", "Not sure — advise me"]} />
                  <Input k="height" label="Required height / dimensions *" />
                  <Input k="quantity" label="Quantity *" type="number" />
                  <Select k="use" label="Intended use *" opts={["Home", "Temple", "Commercial", "Other"]} />
                </div>
                <div>
                  <label htmlFor="ref-img" className="text-sm font-medium">Reference images (optional, up to 5)</label>
                  <input id="ref-img" type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))} className="field mt-1" />
                  {files.length > 0 && <p className="text-xs text-muted-foreground mt-1">{files.map((f) => f.name).join(", ")}</p>}
                </div>
              </>}
              {step === 2 && <>
                <Input k="location" label="Delivery location *" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Select k="budget" label="Budget range *" opts={["Under ₹25,000", "₹25,000 – ₹1,00,000", "₹1,00,000 – ₹5,00,000", "Above ₹5,00,000"]} />
                  <Input k="date" label="Required delivery date" type="date" />
                </div>
                <div><label htmlFor="notes" className="text-sm font-medium">Additional instructions</label><textarea id="notes" rows={4} value={form.notes ?? ""} onChange={set("notes")} className="field mt-1" /></div>
              </>}
              {step === 3 && <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                {Object.entries({ Name: form.name, Phone: form.phone, Email: form.email, Deity: form.deity, Material: form.material, Height: form.height, Quantity: form.quantity, Use: form.use, Location: form.location, Budget: form.budget, "Delivery date": form.date || "Flexible", "Reference images": files.length ? `${files.length} file(s)` : "None" }).map(([k, v]) => (
                  <div key={k} className="border-b pb-2"><dt className="text-xs text-muted-foreground">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>}
              <div className="flex justify-between pt-4">
                <button disabled={step === 0} onClick={() => setStep(step - 1)} className="btn btn-outline">Back</button>
                {step < 3 ? <button onClick={next} className="btn btn-primary">Continue</button> : <button onClick={submit} className="btn btn-primary">Submit Enquiry</button>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
