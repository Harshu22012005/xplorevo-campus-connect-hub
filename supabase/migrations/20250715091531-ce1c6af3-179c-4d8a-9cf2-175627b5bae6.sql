-- Add mobile number and email fields to campus_connect_submissions table
ALTER TABLE public.campus_connect_submissions 
ADD COLUMN mobile_number text,
ADD COLUMN email text;