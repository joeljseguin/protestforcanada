CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL,
  event_title text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  registrant_name text NOT NULL,
  registrant_email text NOT NULL,
  message text,
  organizer_email text NOT NULL,
  organizer_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can register (public-facing feature)
CREATE POLICY "Anyone can insert registrations"
ON public.event_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated users can view their own registrations
CREATE POLICY "Users can view own registrations"
ON public.event_registrations
FOR SELECT
TO authenticated
USING (user_id = auth.uid());