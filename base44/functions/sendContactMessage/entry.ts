import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

const OWNER_EMAIL = '20256009@stud.fci-cu.edu.eg';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return Response.json({ error: 'All fields are required.' }, { status: 400 });
    if (String(name).length > 100 || String(email).length > 150 || String(message).length > 3000) {
      return Response.json({ error: 'Message is too long.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return Response.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: OWNER_EMAIL,
      from_name: 'Portfolio Transmission',
      subject: `New portfolio message from ${String(name).slice(0, 60)}`,
      body: `<p><strong>From:</strong> ${esc(name)} (${esc(email)})</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('sendContactMessage failed:', error?.message, JSON.stringify(error?.response?.data ?? {}));
    return Response.json({ error: 'Transmission failed. Please email directly.' }, { status: 500 });
  }
}