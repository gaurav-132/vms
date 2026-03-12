import { createClient } from '@supabase/supabase-js';

// Fallback to demo keys or require real keys from process.env
// For this portfolio demo, we'll try to use existing env vars or throw a warning
const supabaseUrl =
    process.env.SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
