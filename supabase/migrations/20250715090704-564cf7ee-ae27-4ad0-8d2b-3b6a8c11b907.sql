-- Create campus_connect_submissions table
CREATE TABLE public.campus_connect_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  college_name TEXT NOT NULL,
  college_city TEXT NOT NULL,
  state TEXT NOT NULL,
  instagram_profile TEXT,
  interested_in_leading BOOLEAN NOT NULL DEFAULT false,
  why_join_xplorevo TEXT NOT NULL,
  is_part_of_club BOOLEAN NOT NULL DEFAULT false,
  club_name TEXT,
  role_in_club TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.campus_connect_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit form" 
ON public.campus_connect_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policies for admin access (for the dashboard)
CREATE POLICY "Allow all access for authenticated users" 
ON public.campus_connect_submissions 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_campus_connect_submissions_updated_at
BEFORE UPDATE ON public.campus_connect_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER TABLE public.campus_connect_submissions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campus_connect_submissions;