-- Store each user's CGPA data in a cgpa-prefixed table.
-- Note: this setup is intentionally simple for client-side use.
-- If you later want strict per-user RLS tied to Privy, you'll need a backend/edge function.

create table if not exists public.cgpa_user_data (
  user_id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists cgpa_user_data_updated_at_idx
  on public.cgpa_user_data (updated_at desc);
