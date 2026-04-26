-- ═══════════════════════════════════════════════════
-- POPUP BUILDER — Upgrade Migration V3
-- Adds: button_action_type and button_action_url
-- ═══════════════════════════════════════════════════

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'popups' AND column_name = 'button_action_type') THEN
        ALTER TABLE popups ADD COLUMN button_action_type TEXT DEFAULT 'submit';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'popups' AND column_name = 'button_action_url') THEN
        ALTER TABLE popups ADD COLUMN button_action_url TEXT DEFAULT '';
    END IF;
END $$;
