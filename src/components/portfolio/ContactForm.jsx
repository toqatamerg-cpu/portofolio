import { useState } from "react";
import { base44 } from "@/api/base44Client";

const field = "w-full bg-transparent border-b border-steel/20 py-3 text-lg text-steel placeholder:text-steel/25 focus:outline-none focus:border-cyber transition-colors";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await base44.functions.invoke("sendContactMessage", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("idle");
      setError(err?.response?.data?.error || "Transmission failed. Please email directly.");
    }
  };

  return (
    <form onSubmit={submit} className="border border-steel/10 bg-steel/[0.02] p-7 sm:p-10 space-y-7">
      <p className="font-mono text-[10px] tracking-[0.3em] text-cyber">TRANSMISSION CONSOLE · AES-256</p>
      <label className="block">
        <kbd className="font-mono text-[10px] tracking-[0.25em] text-steel/40">&gt; SENDER_NAME</kbd>
        <input required maxLength={100} value={form.name} onChange={set("name")} placeholder="Your name" className={field} />
      </label>
      <label className="block">
        <kbd className="font-mono text-[10px] tracking-[0.25em] text-steel/40">&gt; RETURN_ADDRESS</kbd>
        <input required type="email" maxLength={150} value={form.email} onChange={set("email")} placeholder="you@domain.com" className={field} />
      </label>
      <label className="block">
        <kbd className="font-mono text-[10px] tracking-[0.25em] text-steel/40">&gt; PAYLOAD</kbd>
        <textarea required maxLength={3000} rows={4} value={form.message} onChange={set("message")} placeholder="Your message..." className={`${field} resize-none`} />
      </label>
      {error && <p className="font-mono text-sm text-alert">{error}</p>}
      {status === "sent" && <p className="font-mono text-sm text-cyber">✓ Transmission received. I'll reply soon.</p>}
      <button
        disabled={status === "sending"}
        className="w-full bg-alert text-void font-mono font-bold text-xs tracking-[0.3em] py-4 hover:bg-steel transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "ENCRYPTING PAYLOAD..." : "TRANSMIT MESSAGE"}
      </button>
    </form>
  );
}