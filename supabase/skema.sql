-- Skema sinkronisasi NurQalam — jalankan SEKALI di Supabase SQL Editor.
-- Satu baris per pengguna: potret data lokal (JSON) + waktu pembaruan.
-- Row Level Security memastikan setiap pengguna hanya bisa mengakses
-- baris miliknya sendiri.

create table if not exists public.data_pengguna (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  diperbarui_pada timestamptz not null default now()
);

alter table public.data_pengguna enable row level security;

drop policy if exists "milik sendiri - baca" on public.data_pengguna;
create policy "milik sendiri - baca"
  on public.data_pengguna for select
  using (auth.uid() = user_id);

drop policy if exists "milik sendiri - tambah" on public.data_pengguna;
create policy "milik sendiri - tambah"
  on public.data_pengguna for insert
  with check (auth.uid() = user_id);

drop policy if exists "milik sendiri - ubah" on public.data_pengguna;
create policy "milik sendiri - ubah"
  on public.data_pengguna for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "milik sendiri - hapus" on public.data_pengguna;
create policy "milik sendiri - hapus"
  on public.data_pengguna for delete
  using (auth.uid() = user_id);
