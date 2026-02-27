-- Migration: Cuentas por Pagar (Liquidations)
-- Add expense tracking to bookings and create liquidations history table.

-- 1. Modify bookings table
ALTER TABLE bookings
ADD COLUMN expenses NUMERIC(10,2) NOT NULL DEFAULT 0,
ADD COLUMN liquidation_status TEXT NOT NULL DEFAULT 'pending'
  CHECK (liquidation_status IN ('pending', 'liquidated')),
ADD COLUMN liquidation_id UUID;

-- 2. Create liquidations table
CREATE TABLE IF NOT EXISTS liquidations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  total_sold NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_expenses NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_profit NUMERIC(10,2) NOT NULL DEFAULT 0,
  -- Store an array of objects: { user_id, name, display_role, percentage, amount }
  partner_splits JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE liquidations ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON liquidations
  FOR ALL USING (true) WITH CHECK (true);

-- Allow admins to read all liquidations
CREATE POLICY "Admin read all" ON liquidations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid() AND u.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Foreign Key: Update bookings after creating the table to link them
ALTER TABLE bookings
ADD CONSTRAINT fk_liquidation
FOREIGN KEY (liquidation_id) 
REFERENCES liquidations(id) 
ON DELETE SET NULL;
