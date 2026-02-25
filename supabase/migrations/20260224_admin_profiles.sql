-- Migration: Create admin_profiles table for revenue share and role management
-- Run this in Supabase SQL Editor or via supabase migration

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_role TEXT NOT NULL DEFAULT 'Administrador'
    CHECK (display_role IN ('Administrador', 'Operador', 'Proveedor')),
  profit_share_pct NUMERIC(5,2) NOT NULL DEFAULT 0
    CHECK (profit_share_pct >= 0 AND profit_share_pct <= 100),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API uses service role key)
CREATE POLICY "Service role full access" ON admin_profiles
  FOR ALL USING (true) WITH CHECK (true);

-- Allow admins to read their own profile
CREATE POLICY "Admin read own" ON admin_profiles
  FOR SELECT USING (auth.uid() = id);
