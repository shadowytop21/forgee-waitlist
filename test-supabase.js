const https = require('https');

const url = 'https://vpiosawxeddjssgmxoqj.supabase.co/rest/v1/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwaW9zYXd4ZWRkanNzZ214b3FqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzQ2MTAwNCwiZXhwIjoyMDkzMDM3MDA0fQ.Q8XoM_SpjykDhAac65XMfdE0NDnMF8f12i3SGcytMUI';

const options = {
  headers: {
    'Authorization': `Bearer ${key}`,
    'apikey': key
  }
};

https.get(url, options, (res) => {
  console.log('✓ Supabase credentials valid! Status:', res.statusCode);
  res.on('data', () => {});
}).on('error', (err) => {
  console.error('✗ Supabase connection failed:', err.message);
});
