
-- Table to track petition sign-throughs by heroes
CREATE TABLE public.petition_signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id text NOT NULL,
  petition_url text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous_id text, -- localStorage ID for anonymous tracking
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous or logged in)
CREATE POLICY "Anyone can insert petition signatures"
  ON public.petition_signatures FOR INSERT
  WITH CHECK (true);

-- Anyone can read counts (public ticker)
CREATE POLICY "Anyone can view petition signatures"
  ON public.petition_signatures FOR SELECT
  USING (true);

-- Enable realtime for live ticker
ALTER PUBLICATION supabase_realtime ADD TABLE public.petition_signatures;
