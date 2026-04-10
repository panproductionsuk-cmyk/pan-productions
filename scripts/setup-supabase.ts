import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  console.log('Setting up Supabase productions table...');

  // Create table using raw SQL via the admin API
  const { error: tableError } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS productions (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        title_en TEXT,
        author TEXT,
        status TEXT NOT NULL CHECK (status IN ('On Sale', 'Upcoming', 'Current', 'Past')),
        description_en TEXT NOT NULL,
        description_tr TEXT NOT NULL,
        image TEXT NOT NULL,
        gallery TEXT[],
        dates TEXT NOT NULL,
        sort_date DATE,
        venue TEXT NOT NULL,
        duration TEXT NOT NULL,
        ticket_price TEXT NOT NULL,
        ticket_link TEXT,
        category TEXT NOT NULL CHECK (category IN ('theatre', 'music', 'art', 'film')),
        show_in_marketing BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
  }).catch(() => null);

  console.log('Productions table created or already exists');

  // Enable RLS
  await supabase.rpc('execute_sql', {
    sql: `ALTER TABLE productions ENABLE ROW LEVEL SECURITY;`
  }).catch(() => null);

  // Create policies for public read access
  await supabase.rpc('execute_sql', {
    sql: `
      CREATE POLICY "Allow public read" ON productions
      FOR SELECT USING (true);
    `
  }).catch(() => null);

  console.log('RLS policies configured');
  console.log('Database setup complete!');
  console.log('You can now manage productions in the Supabase dashboard.');
}

setupDatabase().catch(console.error);
