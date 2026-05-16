import { createClient } from '@supabase/supabase-js';

// Read from multiple possible env locations so this works on Vite or platforms
const url = (import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL || (window as any).__NEXT_PUBLIC_SUPABASE_URL || '';
const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || (window as any).__NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn('Supabase URL or Key not found. Please set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_* envs.');
}

export const supabase = createClient(url, key);

export default supabase;
