-- ═══════════════════════════════════════════════════
-- POPUP BUILDER — Upgrade Migration (run if tables already exist)
-- Adds: border_color, overlay_color, btn_text_color columns
-- Updates: field_type CHECK constraint to include 'date' and 'url'
-- ═══════════════════════════════════════════════════

-- 1. Add new color columns to popups table (safe — IF NOT EXISTS pattern via DO block)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'popups' AND column_name = 'border_color') THEN
        ALTER TABLE popups ADD COLUMN border_color TEXT DEFAULT '#ffffff15';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'popups' AND column_name = 'overlay_color') THEN
        ALTER TABLE popups ADD COLUMN overlay_color TEXT DEFAULT '#00000099';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'popups' AND column_name = 'btn_text_color') THEN
        ALTER TABLE popups ADD COLUMN btn_text_color TEXT DEFAULT '#ffffff';
    END IF;
END $$;

-- 2. Update field_type CHECK constraint to include 'date' and 'url'
-- Drop old constraint and recreate (constraint name is auto-generated, so we find it)
DO $$
DECLARE
    constraint_name TEXT;
BEGIN
    SELECT conname INTO constraint_name
    FROM pg_constraint
    WHERE conrelid = 'popup_fields'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) LIKE '%field_type%';

    IF constraint_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE popup_fields DROP CONSTRAINT %I', constraint_name);
    END IF;

    ALTER TABLE popup_fields ADD CONSTRAINT popup_fields_field_type_check
        CHECK (field_type IN ('text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'number', 'date', 'url'));
END $$;
