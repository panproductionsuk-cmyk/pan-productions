-- Create productions table for Pan Productions
-- This table stores all events/productions that can be displayed on both
-- the Productions page and the PR & Marketing page

CREATE TABLE IF NOT EXISTS productions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  author TEXT,
  status TEXT NOT NULL DEFAULT 'Past',
  description_en TEXT NOT NULL,
  description_tr TEXT NOT NULL,
  image TEXT NOT NULL,
  dates TEXT NOT NULL,
  venue TEXT NOT NULL,
  duration TEXT NOT NULL,
  ticket_price TEXT NOT NULL,
  ticket_link TEXT,
  sort_date DATE,
  director TEXT,
  cast TEXT[],
  credits JSONB,
  gallery TEXT[],
  category TEXT NOT NULL DEFAULT 'theatre',
  show_in_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries by category and status
CREATE INDEX IF NOT EXISTS idx_productions_category ON productions(category);
CREATE INDEX IF NOT EXISTS idx_productions_status ON productions(status);
CREATE INDEX IF NOT EXISTS idx_productions_show_in_marketing ON productions(show_in_marketing);
CREATE INDEX IF NOT EXISTS idx_productions_sort_date ON productions(sort_date DESC);

-- Enable Row Level Security
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view productions)
CREATE POLICY "Allow public read access" ON productions
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update/delete (admin panel)
CREATE POLICY "Allow authenticated insert" ON productions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON productions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON productions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_productions_updated_at ON productions;
CREATE TRIGGER update_productions_updated_at
  BEFORE UPDATE ON productions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
