-- Insert 20 dummy patients with realistic healthcare data
INSERT INTO patients (
  first_name, last_name, date_of_birth, gender, phone, email, address,
  emergency_contact_name, emergency_contact_phone, medical_conditions, 
  medications, allergies, medical_record_number
) VALUES
  ('John', 'Smith', '1965-03-15', 'male', '555-0101', 'john.smith@email.com', '123 Main St, Anytown, ST 12345', 'Jane Smith', '555-0102', 'Hypertension, Type 2 Diabetes', 'Lisinopril, Metformin', 'Penicillin', 'MRN001001'),
  ('Mary', 'Johnson', '1972-08-22', 'female', '555-0103', 'mary.johnson@email.com', '456 Oak Ave, Somewhere, ST 12346', 'Robert Johnson', '555-0104', 'Asthma, Osteoarthritis', 'Albuterol, Ibuprofen', 'Shellfish', 'MRN001002'),
  ('Robert', 'Williams', '1958-12-10', 'male', '555-0105', 'robert.williams@email.com', '789 Pine Rd, Elsewhere, ST 12347', 'Linda Williams', '555-0106', 'Coronary Artery Disease, COPD', 'Atorvastatin, Spiriva', 'Sulfa drugs', 'MRN001003'),
  ('Patricia', 'Brown', '1980-05-18', 'female', '555-0107', 'patricia.brown@email.com', '321 Elm St, Nowhere, ST 12348', 'Michael Brown', '555-0108', 'Hypothyroidism, Anxiety', 'Levothyroxine, Sertraline', 'None known', 'MRN001004'),
  ('Michael', 'Davis', '1945-11-03', 'male', '555-0109', 'michael.davis@email.com', '654 Maple Dr, Anywhere, ST 12349', 'Susan Davis', '555-0110', 'Atrial Fibrillation, Diabetes', 'Warfarin, Insulin', 'Latex', 'MRN001005'),
  ('Jennifer', 'Miller', '1988-07-25', 'female', '555-0111', 'jennifer.miller@email.com', '987 Cedar Ln, Someplace, ST 12350', 'David Miller', '555-0112', 'Migraine, Depression', 'Sumatriptan, Fluoxetine', 'Aspirin', 'MRN001006'),
  ('William', 'Wilson', '1962-01-14', 'male', '555-0113', 'william.wilson@email.com', '147 Birch St, Everytown, ST 12351', 'Carol Wilson', '555-0114', 'Chronic Kidney Disease, Gout', 'Allopurinol, Furosemide', 'Contrast dye', 'MRN001007'),
  ('Elizabeth', 'Moore', '1975-09-30', 'female', '555-0115', 'elizabeth.moore@email.com', '258 Spruce Ave, Hometown, ST 12352', 'James Moore', '555-0116', 'Rheumatoid Arthritis, Osteoporosis', 'Methotrexate, Alendronate', 'Eggs', 'MRN001008'),
  ('David', 'Taylor', '1953-04-07', 'male', '555-0117', 'david.taylor@email.com', '369 Willow Rd, Yourtown, ST 12353', 'Nancy Taylor', '555-0118', 'Heart Failure, Sleep Apnea', 'Carvedilol, CPAP therapy', 'Morphine', 'MRN001009'),
  ('Barbara', 'Anderson', '1967-10-12', 'female', '555-0119', 'barbara.anderson@email.com', '741 Poplar Dr, Ourtown, ST 12354', 'Richard Anderson', '555-0120', 'Breast Cancer History, Osteoarthritis', 'Tamoxifen, Acetaminophen', 'Codeine', 'MRN001010'),
  ('Richard', 'Thomas', '1970-06-28', 'male', '555-0121', 'richard.thomas@email.com', '852 Ash St, Theirtown, ST 12355', 'Helen Thomas', '555-0122', 'Prostate Cancer, Hypertension', 'Bicalutamide, Amlodipine', 'Iodine', 'MRN001011'),
  ('Susan', 'Jackson', '1982-02-16', 'female', '555-0123', 'susan.jackson@email.com', '963 Hickory Ln, Newtown, ST 12356', 'Mark Jackson', '555-0124', 'Fibromyalgia, IBS', 'Pregabalin, Dicyclomine', 'Gluten', 'MRN001012'),
  ('Joseph', 'White', '1959-08-05', 'male', '555-0125', 'joseph.white@email.com', '159 Sycamore Ave, Oldtown, ST 12357', 'Dorothy White', '555-0126', 'Parkinson Disease, Constipation', 'Carbidopa-Levodopa, Docusate', 'None known', 'MRN001013'),
  ('Karen', 'Harris', '1973-12-20', 'female', '555-0127', 'karen.harris@email.com', '357 Chestnut Rd, Bigtown, ST 12358', 'Steven Harris', '555-0128', 'Lupus, Chronic Pain', 'Hydroxychloroquine, Tramadol', 'Penicillin', 'MRN001014'),
  ('Thomas', 'Martin', '1948-05-11', 'male', '555-0129', 'thomas.martin@email.com', '468 Walnut Dr, Smalltown, ST 12359', 'Betty Martin', '555-0130', 'Alzheimer Disease, Hypertension', 'Donepezil, Losartan', 'Shellfish', 'MRN001015'),
  ('Nancy', 'Garcia', '1985-11-08', 'female', '555-0131', 'nancy.garcia@email.com', '579 Beech St, Midtown, ST 12360', 'Carlos Garcia', '555-0132', 'Endometriosis, Anemia', 'Leuprolide, Iron sulfate', 'Sulfa drugs', 'MRN001016'),
  ('Christopher', 'Rodriguez', '1961-03-26', 'male', '555-0133', 'christopher.rodriguez@email.com', '680 Pine Ave, Uptown, ST 12361', 'Maria Rodriguez', '555-0134', 'Stroke History, Diabetes', 'Clopidogrel, Glipizide', 'Latex', 'MRN001017'),
  ('Lisa', 'Lewis', '1977-07-13', 'female', '555-0135', 'lisa.lewis@email.com', '791 Oak Ln, Downtown, ST 12362', 'Paul Lewis', '555-0136', 'Multiple Sclerosis, Fatigue', 'Interferon beta, Modafinil', 'Contrast dye', 'MRN001018'),
  ('Daniel', 'Lee', '1966-09-01', 'male', '555-0137', 'daniel.lee@email.com', '802 Maple Rd, Crosstown, ST 12363', 'Amy Lee', '555-0138', 'Chronic Hepatitis B, Cirrhosis', 'Entecavir, Lactulose', 'Aspirin', 'MRN001019'),
  ('Michelle', 'Walker', '1979-01-24', 'female', '555-0139', 'michelle.walker@email.com', '913 Cedar Dr, Riverside, ST 12364', 'Kevin Walker', '555-0140', 'Bipolar Disorder, Thyroid Nodules', 'Lithium, Levothyroxine', 'Eggs', 'MRN001020');

-- Insert risk assessments for some patients
INSERT INTO risk_assessments (patient_id, risk_score, risk_level, assessment_date, assessment_type, notes, created_by) 
SELECT 
  p.id,
  CASE 
    WHEN random() < 0.2 THEN 85 + (random() * 15)::int  -- 20% critical (85-100)
    WHEN random() < 0.4 THEN 65 + (random() * 20)::int  -- 20% high (65-84)
    WHEN random() < 0.7 THEN 35 + (random() * 30)::int  -- 30% medium (35-64)
    ELSE 10 + (random() * 25)::int                       -- 30% low (10-34)
  END as risk_score,
  CASE 
    WHEN random() < 0.2 THEN 'critical'
    WHEN random() < 0.4 THEN 'high'
    WHEN random() < 0.7 THEN 'medium'
    ELSE 'low'
  END as risk_level,
  NOW() - (random() * interval '30 days') as assessment_date,
  'automated' as assessment_type,
  'Initial risk assessment based on patient history and current conditions' as notes,
  (SELECT id FROM user_profiles WHERE role = 'clinician' LIMIT 1) as created_by
FROM patients p
WHERE random() < 0.8;  -- 80% of patients get an assessment

-- Insert vital signs for patients
INSERT INTO vital_signs (patient_id, systolic_bp, diastolic_bp, heart_rate, temperature, respiratory_rate, oxygen_saturation, recorded_at)
SELECT 
  p.id,
  110 + (random() * 50)::int as systolic_bp,    -- 110-160
  70 + (random() * 30)::int as diastolic_bp,    -- 70-100
  60 + (random() * 40)::int as heart_rate,      -- 60-100
  97.0 + (random() * 4.0) as temperature,      -- 97.0-101.0
  12 + (random() * 8)::int as respiratory_rate, -- 12-20
  95 + (random() * 5)::int as oxygen_saturation, -- 95-100
  NOW() - (random() * interval '7 days') as recorded_at
FROM patients p,
     generate_series(1, 3) -- 3 vital sign records per patient
ORDER BY random();
