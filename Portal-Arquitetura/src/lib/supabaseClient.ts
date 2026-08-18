import { createClient } from "@supabase/supabase-js";

// Assume-se configurado: ConfigGate (src/ConfigGate.tsx) só monta o app depois
// de confirmar que as env vars necessárias estão presentes.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
