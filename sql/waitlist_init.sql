-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table for waitlist emails
CREATE TABLE IF NOT EXISTS public.waitlist_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz DEFAULT now()
);

-- Optional index for quick lookup
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist_emails (email);
