-- Create monitored_queries table
CREATE TABLE IF NOT EXISTS monitored_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, query)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_monitored_queries_client ON monitored_queries(client_id);
CREATE INDEX IF NOT EXISTS idx_monitored_queries_priority ON monitored_queries(priority);

-- Enable RLS
ALTER TABLE monitored_queries ENABLE ROW LEVEL SECURITY;
