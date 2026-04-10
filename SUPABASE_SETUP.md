# Supabase Setup Guide for Pan Productions

## Step 1: Create the Productions Table

Go to your Supabase dashboard and open the **SQL Editor**. Run this SQL to create the productions table:

```sql
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

-- Enable Row Level Security
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read" ON productions
FOR SELECT USING (true);
```

## Step 2: Seed Initial Data

Copy and run this SQL in the same SQL Editor to add all existing productions:

```sql
INSERT INTO productions (id, title, title_en, author, status, description_en, description_tr, image, dates, sort_date, venue, duration, ticket_price, ticket_link, category, show_in_marketing) VALUES
('ferhangi-seyler', 'Ferhangi Things', 'Ferhangi Things', 'Ferhan Şensoy', 'Past', 'A legendary one-man show by the iconic Turkish comedian and theatre artist Ferhan Şensoy. An unforgettable evening of humor, satire, and theatrical brilliance.', "Ferhan Şensoy'un efsanevi tek kişilik gösterisi. Mizah, hiciv ve tiyatro dolu unutulmaz bir gece.", '/images/ferhangi-seyler.jpg', '10 June 2017', '2017-06-10', 'Istanbul', '120 minutes', '45', NULL, 'theatre', true),
('erkan-ogur-bulent', 'Erkan Oğur & Bülent Ortaçgil Concert', 'Erkan Oğur & Bülent Ortaçgil Concert', NULL, 'Past', 'An intimate concert featuring legendary Turkish musicians Erkan Oğur and Bülent Ortaçgil.', "Efsanevi Türk müzisyenler Erkan Oğur ve Bülent Ortaçgil'in samimi konseri.", '/images/erkan-ogur-bulent.jpg', '27 November 2016, 19:00', '2016-11-27', 'Cemal Reşit Rey Concert Hall', '120 minutes', '50', NULL, 'music', true),
('erkan-ogur-ismail', 'Erkan Oğur & İsmail Hakkı Demircioğlu', 'Erkan Oğur & İsmail Hakkı Demircioğlu', NULL, 'Past', 'Legendary Turkish musicians Erkan Oğur and İsmail Hakkı Demircioğlu in an enchanting musical encounter. "All folk songs are beautiful, they are life itself."', "Efsanevi Türk müzisyenler Erkan Oğur ve İsmail Hakkı Demircioğlu''nun büyüleyici müzikal buluşması. \"Bütün türküler güzeldir, hayatın ta kendisidir.\"", '/images/erkan-ogur-ismail.jpg', '15 December 2015, 20:00', '2015-12-15', 'Babylon Istanbul', '150 minutes', '60', NULL, 'music', false),
('olcay-bayir-concert', 'Olcay Bayır Support Concert', 'Olcay Bayır Support Concert', NULL, 'Past', 'A special support concert featuring successful Kurdish-Turkish singer Olcay Bayır. Supported by Djanan Turan, Erdoğan Bayır, Ece & Debora. Live music and DJ Ece until sunrise.', "Başarılı Kürt-Türk şarkıcı Olcay Bayır'ın yer aldığı özel bir destek konseri. Djanan Turan, Erdoğan Bayır, Ece & Debora destekliyor. Canlı müzik ve DJ Ece sabaha kadar.", '/images/olcay-bayir-concert.jpg', '3 April 2015, 22:00', '2015-04-03', 'Istanbul Loft', '180 minutes', '35', NULL, 'music', false);
```

## Step 3: Set Admin Password

Set the admin panel password as an environment variable in v0 project settings (Vars):

```
VITE_ADMIN_PASSWORD=your_secure_password
```

If not set, the default password is `admin123` (change this in production).

## Step 4: Enable Environment Variables

The React app needs these environment variables. Go to your project settings in v0 and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
```

You can find Supabase credentials in your project settings under **API**.

## Step 5: Managing Productions

### Using the Admin Panel

1. Navigate to `/admin` in your app
2. Enter the admin password to login
3. Click **+ Add New Production** to create entries
4. Use the **Edit** button to modify existing productions
5. Toggle **Show in PR & Marketing** to control visibility
6. Use **Delete** to remove productions

### Manual Database Management

Alternatively, manage productions directly in Supabase:

1. Go to Supabase dashboard
2. Open the **productions** table
3. Add/edit/delete rows directly
4. Set `show_in_marketing: true` to display in PR & Marketing archive

## Admin Panel

The admin panel is available at `/admin`. It provides:

- **Authentication**: Simple password protection
- **Add Productions**: Create new events with all required fields
- **Edit Productions**: Modify existing productions
- **Delete Productions**: Remove entries from the database
- **Marketing Toggle**: Control visibility in PR & Marketing archive
- **Live Table**: View all productions with status, category, and marketing flag

Changes made through the admin panel or Supabase will immediately reflect in the Productions and Marketing pages.

