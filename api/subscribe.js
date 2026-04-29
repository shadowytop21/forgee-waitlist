const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let body = req.body;
    if (!body || Object.keys(body).length === 0) {
      // Vercel may send raw JSON string in some runtimes
      try { body = JSON.parse(req.body || '{}'); } catch(e) { body = req.body; }
    }

    const email = (body && body.email) ? String(body.email).trim() : '';
    const source = body && body.source ? String(body.source).trim() : null;

    if (!email || !emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email' });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase environment variables not configured' });
    }

    const payload = { email, source, created_at: new Date().toISOString() };

    const r = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    const text = await r.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch(e){ data = text; }

    if (!r.ok) return res.status(r.status).json({ error: data || text });

    return res.status(200).json({ ok: true, data });

  } catch (err) {
    console.error('subscribe error', err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};
