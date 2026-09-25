-- ============================================================
-- EVOL — Challenge 90 Jours
-- Schéma complet à exécuter dans Supabase (SQL Editor)
-- Projet : https://mtexnsebqkndydiaegdh.supabase.co
-- ============================================================

-- 1. Coordonnées collectées au début du parcours (écran d'identité)
create table if not exists public.evol_users (
  id uuid primary key default gen_random_uuid(),
  prenom text not null,
  email text not null,
  telephone text not null,
  created_at timestamptz not null default now()
);

-- 2. Checkpoint complet de fin de parcours (Grande Carte)
create table if not exists public.evol_checkpoints (
  id uuid primary key default gen_random_uuid(),
  photo_scores jsonb,
  priorities text[],
  starting_points jsonb,
  anchor_habits jsonb,
  pacte jsonb,
  created_at timestamptz not null default now()
);

-- 3. Sécurité : Row Level Level Security activée sur les deux tables
alter table public.evol_users enable row level security;
alter table public.evol_checkpoints enable row level security;

-- 4. Le formulaire web (clé anon) peut uniquement INSÉRER.
--    Aucune politique de lecture : les données ne sont jamais
--    exposées publiquement — seul le dashboard (service role) les lit.
create policy "evol_users_anon_insert"
  on public.evol_users for insert
  to anon
  with check (true);

create policy "evol_checkpoints_anon_insert"
  on public.evol_checkpoints for insert
  to anon
  with check (true);
