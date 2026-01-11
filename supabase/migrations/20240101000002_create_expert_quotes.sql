-- Create expert_quotes table
CREATE TABLE IF NOT EXISTS expert_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  person TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_expert_quotes_client ON expert_quotes(client_id);

-- Enable RLS
ALTER TABLE expert_quotes ENABLE ROW LEVEL SECURITY;
