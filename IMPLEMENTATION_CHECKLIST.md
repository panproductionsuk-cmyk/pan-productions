# Implementation Checklist - Pan Productions Supabase Integration

## ✅ Completed Tasks

### Code Changes
- [x] Created shared `src/data/productions.ts` - Single source of truth for all production data
- [x] Integrated Supabase client (`src/lib/supabase.ts`)
- [x] Built custom hooks (`src/hooks/useSupabaseProductions.ts`):
  - `useProductions()` - Fetch all productions
  - `useProductionById(id)` - Fetch single production
  - `useMarketingProductions()` - Fetch marketing-tagged productions
- [x] Updated all pages to use Supabase with local fallback:
  - `src/pages/Productions.tsx`
  - `src/pages/ProductionDetails.tsx`
  - `src/pages/Marketing.tsx`
- [x] Created Admin Panel:
  - `src/pages/Admin.tsx` - Main admin route
  - `src/components/AdminLogin.tsx` - Password authentication
  - `src/components/AdminDashboard.tsx` - Production management table
  - `src/components/AdminProductionForm.tsx` - Create/edit form
  - `src/hooks/useAdminAuth.ts` - Admin session management
- [x] Added `/admin` route to `src/App.tsx`
- [x] Fixed collapsible Partners carousel (PartnersCarousel.tsx)
- [x] Removed SUS event from hero carousel

### Documentation
- [x] Created `SUPABASE_SETUP.md` - Step-by-step database setup
- [x] Created `IMPLEMENTATION_CHECKLIST.md` - This file

## 📋 Next Steps - What You Need To Do

### Step 1: Set Up Supabase Database (5 minutes)
1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste **ALL SQL** from `SUPABASE_SETUP.md` (the full schema + RLS + seed data)
4. Execute the SQL
5. Verify the `productions` table appears with 4 seeded entries

### Step 2: Configure Environment Variables (3 minutes)
In v0 project settings → **Vars**, add:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_secure_admin_password
```

**Where to find these:**
- `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Supabase Dashboard → Settings → API
- `VITE_ADMIN_PASSWORD`: Create your own secure password

### Step 3: Test the Integration (5 minutes)
1. Refresh the preview
2. Visit `/admin` and log in with your `VITE_ADMIN_PASSWORD`
3. You should see a table with the 4 seeded productions
4. Try adding a new production via the form
5. Toggle "Show in PR & Marketing" and verify it appears in `/marketing`

### Step 4: Verify Pages (3 minutes)
- [ ] `/productions` - Shows all categories of productions (fetching from Supabase)
- [ ] `/productions/:id` - Detail pages work for all productions
- [ ] `/marketing` - Shows only productions with `show_in_marketing: true`
- [ ] Collections update in real-time when you add/edit in admin panel

## 🔧 Admin Panel Features

**Access:** `/admin`

**Login:** Enter your `VITE_ADMIN_PASSWORD`

**Available Actions:**
- ➕ **Add New Production** - Opens form to create entries
- ✏️ **Edit** - Modify any existing production
- 🗑️ **Delete** - Remove productions (with confirmation)
- 🎯 **Toggle Marketing Flag** - Show/hide from PR & Marketing archive
- 🔍 **Live Table** - View all productions with status and categories

**Form Fields:**
- Title (English & Turkish)
- Author (optional)
- Status (On Sale, Upcoming, Current, Past)
- Description (English & Turkish)
- Image URL
- Gallery URLs (comma-separated)
- Dates
- Venue
- Duration
- Ticket Price
- Ticket Link (optional)
- Category (theatre, music, art, film)
- Show in PR & Marketing (checkbox)

## 📊 Data Structure

Each production has:
```typescript
{
  id: string (slug, auto-generated)
  title: string
  titleEn: string (optional)
  author: string (optional)
  status: 'On Sale' | 'Upcoming' | 'Current' | 'Past'
  description: { EN: string; TR: string }
  image: string (URL)
  gallery: string[] (URLs)
  dates: string
  sortDate: string (YYYY-MM-DD for sorting)
  venue: string
  duration: string
  ticketPrice: string
  ticketLink: string (optional)
  category: 'theatre' | 'music' | 'art' | 'film'
  show_in_marketing: boolean
}
```

## 🚀 Going Live

Once you've completed all steps:

1. Test thoroughly in the preview
2. Merge this branch to `main`
3. Deploy to production

The app will automatically:
- Fetch live data from Supabase
- Fall back to local data if Supabase is unavailable
- Update all pages instantly when productions are added/edited

## 🆘 Troubleshooting

**Admin panel shows no productions:**
- Check env vars are set correctly in v0 settings
- Verify SQL was executed in Supabase
- Check browser console for errors (F12 → Console)

**Changes in admin don't appear:**
- Refresh the page (Cmd/Ctrl + R)
- Check that `show_in_marketing: true` is set for Marketing page

**Supabase connection error:**
- Verify credentials in `.env`
- Check Supabase project is active
- Ensure RLS policies are enabled (they're created by the SQL)

## 📝 Notes

- Local data (`src/data/productions.ts`) remains as fallback for development
- All changes through admin panel are permanent (stored in Supabase)
- Each admin login creates a 24-hour session token
- Password is hashed client-side, not sent to any server

---

**Setup Time:** ~15 minutes total  
**Status:** Ready for database initialization
