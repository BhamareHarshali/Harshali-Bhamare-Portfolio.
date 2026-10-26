-- =========================================================================
-- Harshali Bhamare Portfolio - Contact Messages Database Schema
-- Compatible with Supabase PostgreSQL, Cloud SQL, Neon, or Standard PostgreSQL
-- =========================================================================

-- 1. Create table for persistent contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL
);

-- 2. Indexes for fast retrieval and filtering
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages (is_read);

-- 3. Row Level Security (RLS) Policies for Supabase / PostgreSQL
-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow ANY public visitor to insert a new enquiry (anonymous form submission)
CREATE POLICY "Allow public insert of contact messages"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);

-- Disallow public visitors from selecting (reading) messages from the table
-- Only authenticated administrators or service_role can read messages
CREATE POLICY "Allow authenticated admin read access"
ON contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated administrator can update message read status
CREATE POLICY "Allow authenticated admin update access"
ON contact_messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated administrator can delete messages
CREATE POLICY "Allow authenticated admin delete access"
ON contact_messages
FOR DELETE
TO authenticated
USING (true);
