-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('clinician', 'admin')) DEFAULT 'clinician',
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  medical_record_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk_assessments table
CREATE TABLE IF NOT EXISTS public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  clinician_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  risk_score DECIMAL(5,2) NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vital_signs table
CREATE TABLE IF NOT EXISTS public.vital_signs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  heart_rate INTEGER,
  temperature DECIMAL(4,1),
  oxygen_saturation INTEGER,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('high_risk', 'critical_vitals', 'missing_data')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  is_acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_by UUID REFERENCES public.users(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for patients table (all authenticated users can access)
CREATE POLICY "Authenticated users can view patients" ON public.patients
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert patients" ON public.patients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update patients" ON public.patients
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for risk_assessments table
CREATE POLICY "Authenticated users can view risk assessments" ON public.risk_assessments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Clinicians can create risk assessments" ON public.risk_assessments
  FOR INSERT WITH CHECK (auth.uid() = clinician_id);

CREATE POLICY "Clinicians can update their own assessments" ON public.risk_assessments
  FOR UPDATE USING (auth.uid() = clinician_id);

-- RLS Policies for vital_signs table
CREATE POLICY "Authenticated users can view vital signs" ON public.vital_signs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert vital signs" ON public.vital_signs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update vital signs" ON public.vital_signs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for alerts table
CREATE POLICY "Authenticated users can view alerts" ON public.alerts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update alerts" ON public.alerts
  FOR UPDATE USING (auth.role() = 'authenticated');
