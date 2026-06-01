-- Migration: Create Guides Table
-- Description: Creates a table to manage technical guides with admin capabilities

CREATE TABLE public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    published BOOLEAN DEFAULT false,
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published guides
CREATE POLICY "Allow public read access to published guides"
    ON public.guides
    FOR SELECT
    USING (published = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow admin full access to guides"
    ON public.guides
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_guides_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
CREATE TRIGGER update_guides_updated_at
    BEFORE UPDATE ON public.guides
    FOR EACH ROW
    EXECUTE PROCEDURE update_guides_updated_at_column();
