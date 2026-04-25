-- ═══════════════════════════════════════════════════
-- POPUP BUILDER SYSTEM — Supabase Migration
-- ═══════════════════════════════════════════════════

-- 1. Main popups table
CREATE TABLE IF NOT EXISTS popups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    style TEXT NOT NULL DEFAULT 'modal'
        CHECK (style IN ('modal', 'slide_in', 'bottom_bar', 'fullscreen', 'corner_card')),
    heading TEXT NOT NULL DEFAULT '',
    description TEXT DEFAULT '',
    button_text TEXT DEFAULT 'Submit',
    success_message TEXT DEFAULT 'Thank you! We''ll be in touch.',
    bg_color TEXT DEFAULT '#0a0a0a',
    text_color TEXT DEFAULT '#ffffff',
    accent_color TEXT DEFAULT '#EB5E28',
    border_color TEXT DEFAULT '#ffffff15',
    overlay_color TEXT DEFAULT '#00000099',
    btn_text_color TEXT DEFAULT '#ffffff',
    image_url TEXT DEFAULT '',
    trigger_type TEXT NOT NULL DEFAULT 'page_load'
        CHECK (trigger_type IN ('page_load', 'scroll', 'exit_intent', 'manual')),
    trigger_value TEXT DEFAULT '3',
    show_on_pages TEXT[] DEFAULT ARRAY['*'],
    is_active BOOLEAN DEFAULT false,
    show_once BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Dynamic form fields for each popup
CREATE TABLE IF NOT EXISTS popup_fields (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    popup_id UUID NOT NULL REFERENCES popups(id) ON DELETE CASCADE,
    field_type TEXT NOT NULL DEFAULT 'text'
        CHECK (field_type IN ('text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'number', 'date', 'url')),
    label TEXT NOT NULL,
    placeholder TEXT DEFAULT '',
    is_required BOOLEAN DEFAULT false,
    options TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Visitor submissions
CREATE TABLE IF NOT EXISTS popup_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    popup_id UUID NOT NULL REFERENCES popups(id) ON DELETE CASCADE,
    data JSONB NOT NULL DEFAULT '{}'::JSONB,
    page_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_popups_active ON popups(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_popup_fields_popup_id ON popup_fields(popup_id);
CREATE INDEX IF NOT EXISTS idx_popup_fields_sort ON popup_fields(popup_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_popup_submissions_popup_id ON popup_submissions(popup_id);
CREATE INDEX IF NOT EXISTS idx_popup_submissions_created ON popup_submissions(created_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_popups_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_popups_updated_at ON popups;
CREATE TRIGGER trigger_popups_updated_at
    BEFORE UPDATE ON popups
    FOR EACH ROW
    EXECUTE FUNCTION update_popups_updated_at();

-- RLS Policies (public read for active popups, authenticated write)
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;
ALTER TABLE popup_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE popup_submissions ENABLE ROW LEVEL SECURITY;

-- Public can read active popups
CREATE POLICY "Public can read active popups" ON popups
    FOR SELECT USING (is_active = true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated full access on popups" ON popups
    FOR ALL USING (auth.role() = 'authenticated');

-- Public can read fields of active popups
CREATE POLICY "Public can read popup fields" ON popup_fields
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM popups WHERE popups.id = popup_fields.popup_id AND popups.is_active = true)
    );

-- Authenticated users can manage fields
CREATE POLICY "Authenticated full access on popup_fields" ON popup_fields
    FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can submit (insert) — but not read others' submissions
CREATE POLICY "Anyone can submit" ON popup_submissions
    FOR INSERT WITH CHECK (true);

-- Only authenticated can read submissions
CREATE POLICY "Authenticated can read submissions" ON popup_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated can delete submissions
CREATE POLICY "Authenticated can delete submissions" ON popup_submissions
    FOR DELETE USING (auth.role() = 'authenticated');
