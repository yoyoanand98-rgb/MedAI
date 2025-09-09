-- Generate some sample alerts for demonstration
DO $$
DECLARE
  patient_id UUID;
BEGIN
  -- Get a sample patient ID
  SELECT id INTO patient_id FROM public.patients LIMIT 1;
  
  IF patient_id IS NOT NULL THEN
    -- Insert sample alerts
    INSERT INTO public.alerts (patient_id, alert_type, severity, message, created_at) VALUES
    (patient_id, 'high_risk', 'high', 'HIGH RISK: Patient has been assessed with high risk level (85%). Review recommended.', NOW() - INTERVAL '2 hours'),
    (patient_id, 'critical_vitals', 'critical', 'CRITICAL VITALS: Abnormal vital signs detected - BP: 190/110, HR: 125, SpO2: 88%. Immediate assessment required.', NOW() - INTERVAL '1 hour'),
    (patient_id, 'missing_data', 'medium', 'Missing vital signs data. No readings in the past 7 days.', NOW() - INTERVAL '30 minutes');
  END IF;
END $$;
