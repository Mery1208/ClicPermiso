import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  throw new Error(' Error: VITE_SUPABASE_URL no está configurada o es inválida en el archivo .env')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  throw new Error(' Error: VITE_SUPABASE_ANON_KEY no está configurada en el archivo .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
