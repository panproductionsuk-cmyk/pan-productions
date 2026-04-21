-- Add event_date column for the actual first event date
-- This is used for sorting and date-based operations
-- The existing 'dates' TEXT field is for display purposes only

ALTER TABLE productions 
ADD COLUMN IF NOT EXISTS event_date DATE;

-- Create an index for better sorting performance
CREATE INDEX IF NOT EXISTS idx_productions_event_date ON productions(event_date DESC);

-- Update the sort to use event_date as primary sort field
COMMENT ON COLUMN productions.event_date IS 'The actual date of the first event, used for sorting';
COMMENT ON COLUMN productions.dates IS 'Display text for dates shown on website';
COMMENT ON COLUMN productions.sort_date IS 'Legacy sort field - prefer event_date for new entries';
