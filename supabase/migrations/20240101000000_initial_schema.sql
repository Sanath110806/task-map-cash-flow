
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('task_provider', 'gig_worker', 'both');
CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    user_role user_role DEFAULT 'both',
    address TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    profile_image_url TEXT,
    rating DECIMAL DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL NOT NULL,
    estimated_time TEXT,
    urgency TEXT,
    location TEXT NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    status task_status DEFAULT 'open',
    poster_id UUID REFERENCES profiles(id),
    assigned_worker_id UUID REFERENCES profiles(id),
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create task_applications table
CREATE TABLE task_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT,
    status application_status DEFAULT 'pending',
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    responded_at TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_tasks_location ON tasks(latitude, longitude);
CREATE INDEX idx_task_applications_task_id ON task_applications(task_id);
CREATE INDEX idx_task_applications_worker_id ON task_applications(worker_id);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can read all profiles but only update their own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tasks: Anyone can read open tasks, only poster can update
CREATE POLICY "Open tasks are viewable by everyone" ON tasks FOR SELECT USING (status = 'open' OR auth.uid() = poster_id OR auth.uid() = assigned_worker_id);
CREATE POLICY "Users can insert own tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = poster_id);
CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (auth.uid() = poster_id);

-- Task Applications: Users can see their own applications and applications to their tasks
CREATE POLICY "Users can view relevant applications" ON task_applications FOR SELECT USING (
    auth.uid() = worker_id OR 
    auth.uid() IN (SELECT poster_id FROM tasks WHERE id = task_id)
);
CREATE POLICY "Users can insert own applications" ON task_applications FOR INSERT WITH CHECK (auth.uid() = worker_id);
CREATE POLICY "Task posters can update application status" ON task_applications FOR UPDATE USING (
    auth.uid() IN (SELECT poster_id FROM tasks WHERE id = task_id)
);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO profiles (id, email, first_name, last_name, phone, user_role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'firstName', ''),
        COALESCE(NEW.raw_user_meta_data->>'lastName', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE((NEW.raw_user_meta_data->>'userRole')::user_role, 'both')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
