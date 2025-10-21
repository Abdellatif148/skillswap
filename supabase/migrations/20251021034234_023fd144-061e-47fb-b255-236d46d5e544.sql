-- Create profiles table for user data
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  profile_completed boolean not null default false
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Profiles are viewable by everyone" 
on public.profiles 
for select 
using (true);

create policy "Users can update their own profile" 
on public.profiles 
for update 
using (auth.uid() = id);

create policy "Users can insert their own profile" 
on public.profiles 
for insert 
with check (auth.uid() = id);

-- Create skills table
create table public.skills (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_name text not null,
  skill_type text not null check (skill_type in ('teach', 'learn')),
  skill_level text not null check (skill_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at timestamp with time zone not null default now()
);

-- Enable RLS on skills
alter table public.skills enable row level security;

-- Skills policies
create policy "Skills are viewable by everyone"
on public.skills
for select
using (true);

create policy "Users can insert their own skills"
on public.skills
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own skills"
on public.skills
for update
using (auth.uid() = user_id);

create policy "Users can delete their own skills"
on public.skills
for delete
using (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for profiles updated_at
create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.email);
  return new;
end;
$$;

-- Trigger to create profile when user signs up
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();