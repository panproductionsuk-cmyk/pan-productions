-- Partners & Supporters carousel logos
-- Managed via the Admin Panel "Partners & Supporters" tab.

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.partners enable row level security;

drop policy if exists "Allow public read access" on public.partners;
create policy "Allow public read access" on public.partners
  for select to public using (true);

drop policy if exists "Allow authenticated insert" on public.partners;
create policy "Allow authenticated insert" on public.partners
  for insert to public with check (true);

drop policy if exists "Allow authenticated update" on public.partners;
create policy "Allow authenticated update" on public.partners
  for update to public using (true);

drop policy if exists "Allow authenticated delete" on public.partners;
create policy "Allow authenticated delete" on public.partners
  for delete to public using (true);

create index if not exists partners_sort_order_idx on public.partners (sort_order);

-- Seed with the logos currently shown in the Our Partners & Supporters carousel
insert into public.partners (name, logo, sort_order, visible)
select * from (values
  ('O2 Academy Islington', '/images/partners/o2-academy-islington.png', 0, true),
  ('Islington Assembly Hall', '/images/partners/islington-assembly-hall.png', 1, true),
  ('Arcola Theatre', '/images/partners/arcola-theatre.png', 2, true),
  ('Acoustic Brasserie', '/images/partners/acoustic-brasserie.png', 3, true),
  ('C.N.A Catering Logistics Limited', '/images/partners/cna-catering.png', 4, true),
  ('Morgan Has Solicitors', '/images/partners/morgan-has-solicitors.png', 5, true),
  ('FoodArt UK Limited', '/images/partners/foodart-uk.png', 6, true),
  ('Gama', '/images/partners/gama.png', 7, true),
  ('Hackney Showroom', '/images/partners/hackney-showroom.png', 8, true),
  ('Union Chapel', '/images/partners/union-chapel.png', 9, true),
  ('Millfield Theatre', '/images/partners/millfield-theatre.png', 10, true),
  ('Sütdiyari', '/images/partners/sutdiyari.png', 11, true),
  ('WAVA Design', '/images/partners/wava-design.png', 12, true),
  ('Yum Yum Thai Cuisine', '/images/partners/yumyum-thai.png', 13, true)
) as v(name, logo, sort_order, visible)
where not exists (select 1 from public.partners);
