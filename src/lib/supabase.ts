import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtexnsebqkndydiaegdh.supabase.co'
const supabaseAnonKey = 'sb_publishable_GKtayAL2dwdvzUsbAJj53Q_xGmVhWBg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveEvolUser(identity: {
  prenom: string
  email: string
  telephone: string
}) {
  const { error } = await supabase.from('evol_users').insert(identity)
  if (error) throw error
}
