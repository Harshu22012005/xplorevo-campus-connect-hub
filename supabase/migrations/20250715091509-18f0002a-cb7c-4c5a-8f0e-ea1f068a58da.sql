-- Add mobile number and email fields to campus_connect_submissions table
ALTER TABLE public.campus_connect_submissions 
ADD COLUMN mobile_number text NOT NULL DEFAULT '',
ADD COLUMN email text NOT NULL DEFAULT '';

-- Add constraints for email validation
ALTER TABLE public.campus_connect_submissions 
ADD CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add constraint for mobile number (Indian format)
ALTER TABLE public.campus_connect_submissions 
ADD CONSTRAINT mobile_number_format_check CHECK (mobile_number ~* '^[6-9][0-9]{9}$');