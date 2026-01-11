-- Create citations table
CREATE TABLE IF NOT EXISTS citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  platform TEXT NOT NULL,
  cited BOOLEAN NOT NULL,
  citation_context TEXT,
  position INTEGER,
  competitors_cited TEXT[] DEFAULT '{}',
  content_path TEXT,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_citations_client ON citations(client_id);
CREATE INDEX IF NOT EXISTS idx_citations_platform ON citations(platform);
CREATE INDEX IF NOT EXISTS idx_citations_checked ON citations(checked_at);
CREATE INDEX IF NOT EXISTS idx_citations_query ON citations(query);

-- Enable RLS
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
