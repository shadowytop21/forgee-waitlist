const https = require('https');

const testEmail = `test-${Date.now()}@waitlist.dev`;
const apiUrl = 'http://localhost:3000/api/subscribe';

console.log('Testing full form submission to localhost API...\n');

const payload = JSON.stringify({ email: testEmail, source: 'test' });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/subscribe',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = require('http').request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    try {
      const parsed = JSON.parse(data);
      if (parsed.ok) {
        console.log('\n✓ SUCCESS! Email submitted:', testEmail);
      } else {
        console.log('\n✗ API returned error:', parsed.error);
        if (parsed.error && parsed.error.includes('waitlist_emails')) {
          console.log('\n→ Table does not exist yet. Run SQL in Supabase:');
          console.log('  Go to https://app.supabase.com → SQL Editor → New query');
          console.log('  Paste contents of sql/waitlist_init.sql and click Run');
        }
      }
    } catch(e) {
      console.log('\n✗ Failed to parse response');
    }
  });
});

req.on('error', (err) => console.error('Request error:', err.message));
req.write(payload);
req.end();
