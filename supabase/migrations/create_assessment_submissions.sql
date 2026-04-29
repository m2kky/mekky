-- Octaholic AI Workshop assessment submissions

CREATE TABLE IF NOT EXISTS assessment_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT NOT NULL DEFAULT 'octaholic-ai-workshop-2026',
    company TEXT NOT NULL DEFAULT 'Octaholic',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    position_label TEXT NOT NULL,
    answers JSONB NOT NULL DEFAULT '[]'::JSONB,
    user_agent TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_assessment_submissions_assessment_email
    ON assessment_submissions (assessment_id, lower(email));

CREATE UNIQUE INDEX IF NOT EXISTS idx_assessment_submissions_assessment_phone
    ON assessment_submissions (assessment_id, phone);

CREATE INDEX IF NOT EXISTS idx_assessment_submissions_position
    ON assessment_submissions (assessment_id, position);

CREATE INDEX IF NOT EXISTS idx_assessment_submissions_created_at
    ON assessment_submissions (created_at DESC);

ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can read assessment submissions" ON assessment_submissions;
CREATE POLICY "Authenticated can read assessment submissions" ON assessment_submissions
    FOR SELECT USING (auth.role() = 'authenticated');
