-- Insert sample patients (only if no patients exist)
INSERT INTO public.patients (first_name, last_name, date_of_birth, gender, medical_record_number)
SELECT * FROM (VALUES
  ('John', 'Smith', '1975-03-15', 'male', 'MRN001'),
  ('Sarah', 'Johnson', '1982-07-22', 'female', 'MRN002'),
  ('Michael', 'Brown', '1968-11-08', 'male', 'MRN003'),
  ('Emily', 'Davis', '1990-05-12', 'female', 'MRN004'),
  ('Robert', 'Wilson', '1955-09-30', 'male', 'MRN005'),
  ('Lisa', 'Anderson', '1978-12-03', 'female', 'MRN006'),
  ('David', 'Taylor', '1985-04-18', 'male', 'MRN007'),
  ('Jennifer', 'Martinez', '1972-08-25', 'female', 'MRN008')
) AS sample_data(first_name, last_name, date_of_birth, gender, medical_record_number)
WHERE NOT EXISTS (SELECT 1 FROM public.patients LIMIT 1);

-- Insert sample vital signs for the patients
INSERT INTO public.vital_signs (patient_id, systolic_bp, diastolic_bp, heart_rate, temperature, oxygen_saturation, recorded_at)
SELECT 
  p.id,
  120 + (RANDOM() * 40)::INTEGER, -- systolic_bp between 120-160
  80 + (RANDOM() * 20)::INTEGER,  -- diastolic_bp between 80-100
  60 + (RANDOM() * 40)::INTEGER,  -- heart_rate between 60-100
  98.0 + (RANDOM() * 4)::DECIMAL(4,1), -- temperature between 98.0-102.0
  95 + (RANDOM() * 5)::INTEGER,   -- oxygen_saturation between 95-100
  NOW() - (RANDOM() * INTERVAL '7 days') -- recorded within last 7 days
FROM public.patients p
WHERE NOT EXISTS (SELECT 1 FROM public.vital_signs LIMIT 1);

-- Insert additional vital signs records for trend analysis
INSERT INTO public.vital_signs (patient_id, systolic_bp, diastolic_bp, heart_rate, temperature, oxygen_saturation, recorded_at)
SELECT 
  p.id,
  115 + (RANDOM() * 50)::INTEGER,
  75 + (RANDOM() * 25)::INTEGER,
  65 + (RANDOM() * 35)::INTEGER,
  97.5 + (RANDOM() * 3.5)::DECIMAL(4,1),
  94 + (RANDOM() * 6)::INTEGER,
  NOW() - (RANDOM() * INTERVAL '14 days')
FROM public.patients p;
