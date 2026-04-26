-- Add automation and sequencing columns to popups table
ALTER TABLE popups
ADD COLUMN IF NOT EXISTS priority INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS delay_after_close INT,
ADD COLUMN IF NOT EXISTS delay_after_submit INT,
ADD COLUMN IF NOT EXISTS next_popup_on_close UUID REFERENCES popups(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS next_popup_on_submit UUID REFERENCES popups(id) ON DELETE SET NULL;
