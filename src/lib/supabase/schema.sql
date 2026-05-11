-- ============================================================
-- INFINITE WELLNESS — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable RLS
alter database postgres set "app.jwt_secret" to 'your-jwt-secret';

-- User Profiles
create table if not exists public.user_profiles (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references auth.users(id) on delete cascade not null unique,
  first_name            text,
  last_name             text,
  date_of_birth         date,
  gender                text check (gender in ('male','female','non_binary','prefer_not_to_say')),
  height_cm             decimal(5,1),
  current_weight_kg     decimal(5,2),
  target_weight_kg      decimal(5,2),
  activity_level        text check (activity_level in ('sedentary','lightly_active','moderately_active','very_active','extremely_active')),
  primary_goal          text check (primary_goal in ('fat_loss','muscle_gain','maintenance','stamina','mental_health','general_wellness')),
  diet_type             text,
  coach_tone            text default 'balanced' check (coach_tone in ('friendly','strict','scientific','balanced')),
  calorie_target        integer,
  protein_target_g      integer,
  carbs_target_g        integer,
  fat_target_g          integer,
  water_target_ml       integer default 2000,
  steps_target          integer default 8000,
  onboarding_completed  boolean default false,
  is_pro                boolean default false,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- Food Logs
create table if not exists public.food_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  food_name     text not null,
  meal_type     text not null check (meal_type in ('breakfast','lunch','dinner','snack')),
  calories      decimal(7,1) not null,
  protein_g     decimal(6,2) default 0,
  carbs_g       decimal(6,2) default 0,
  fat_g         decimal(6,2) default 0,
  quantity_g    decimal(7,1),
  source        text default 'manual' check (source in ('search','photo_ai','manual','barcode')),
  logged_at     timestamptz default now(),
  created_at    timestamptz default now()
);

-- Weight Logs
create table if not exists public.weight_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  weight_kg   decimal(5,2) not null,
  notes       text,
  logged_at   timestamptz default now()
);

-- Workout Plans
create table if not exists public.workout_plans (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users(id) on delete cascade not null,
  name              text not null,
  goal              text,
  days_per_week     integer,
  experience_level  text,
  plan_data         jsonb not null default '{}',
  is_active         boolean default true,
  created_at        timestamptz default now()
);

-- Workout Sessions
create table if not exists public.workout_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  plan_id         uuid references public.workout_plans(id),
  workout_name    text not null,
  duration_min    integer,
  calories_burned integer,
  mood_after      integer check (mood_after between 1 and 10),
  notes           text,
  completed_at    timestamptz default now()
);

-- Chat Conversations
create table if not exists public.chat_conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text default 'New conversation',
  created_at  timestamptz default now()
);

-- Chat Messages
create table if not exists public.chat_messages (
  id                uuid primary key default gen_random_uuid(),
  conversation_id   uuid references public.chat_conversations(id) on delete cascade not null,
  user_id           uuid references auth.users(id) on delete cascade not null,
  role              text not null check (role in ('user','assistant')),
  content           text not null,
  created_at        timestamptz default now()
);

-- Daily Habit Summaries
create table if not exists public.daily_habits (
  user_id         uuid references auth.users(id) on delete cascade not null,
  habit_date      date not null default current_date,
  water_ml        integer default 0,
  steps           integer default 0,
  workout_done    boolean default false,
  mood            integer check (mood between 1 and 5),
  sleep_hours     decimal(3,1),
  updated_at      timestamptz default now(),
  primary key (user_id, habit_date)
);

-- Enable Row Level Security
alter table public.user_profiles     enable row level security;
alter table public.food_logs         enable row level security;
alter table public.weight_logs       enable row level security;
alter table public.workout_plans     enable row level security;
alter table public.workout_sessions  enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages     enable row level security;
alter table public.daily_habits      enable row level security;

-- RLS Policies (users can only access their own data)
create policy "Users own data" on public.user_profiles     for all using (auth.uid() = user_id);
create policy "Users own data" on public.food_logs         for all using (auth.uid() = user_id);
create policy "Users own data" on public.weight_logs       for all using (auth.uid() = user_id);
create policy "Users own data" on public.workout_plans     for all using (auth.uid() = user_id);
create policy "Users own data" on public.workout_sessions  for all using (auth.uid() = user_id);
create policy "Users own data" on public.chat_conversations for all using (auth.uid() = user_id);
create policy "Users own data" on public.chat_messages     for all using (auth.uid() = user_id);
create policy "Users own data" on public.daily_habits      for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_profiles (user_id, first_name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
