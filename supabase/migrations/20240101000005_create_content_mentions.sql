-- Create content_mentions table
CREATE TABLE IF NOT EXISTS content_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_path TEXT NOT NULL,
  repo TEXT NOT NULL,
  mention_type TEXT,
  mention_context TEXT,
  github_url TEXT,
  geo_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_mentions_client ON content_mentions(client_id);
CREATE INDEX IF NOT EXISTS idx_content_mentions_type ON content_mentions(content_type);
CREATE INDEX IF NOT EXISTS idx_content_mentions_updated ON content_mentions(updated_at);

-- Enable RLS
ALTER TABLE content_mentions ENABLE ROW LEVEL SECURITY;
