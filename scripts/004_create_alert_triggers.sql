-- Function to generate alerts based on risk assessments
CREATE OR REPLACE FUNCTION public.generate_risk_alerts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Generate alert for high or critical risk assessments
  IF NEW.risk_level IN ('high', 'critical') THEN
    INSERT INTO public.alerts (
      patient_id,
      alert_type,
      severity,
      message
    ) VALUES (
      NEW.patient_id,
      'high_risk',
      NEW.risk_level,
      CASE 
        WHEN NEW.risk_level = 'critical' THEN 
          'CRITICAL: Patient has been assessed with critical risk level (' || NEW.risk_score || '%). Immediate attention required.'
        ELSE 
          'HIGH RISK: Patient has been assessed with high risk level (' || NEW.risk_score || '%). Review recommended.'
      END
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Function to generate alerts based on vital signs
CREATE OR REPLACE FUNCTION public.generate_vitals_alerts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check for critical vital signs
  IF NEW.systolic_bp > 180 OR NEW.systolic_bp < 90 OR
     NEW.diastolic_bp > 110 OR NEW.diastolic_bp < 60 OR
     NEW.heart_rate > 120 OR NEW.heart_rate < 50 OR
     NEW.oxygen_saturation < 90 THEN
    
    INSERT INTO public.alerts (
      patient_id,
      alert_type,
      severity,
      message
    ) VALUES (
      NEW.patient_id,
      'critical_vitals',
      'critical',
      'CRITICAL VITALS: Abnormal vital signs detected - BP: ' || NEW.systolic_bp || '/' || NEW.diastolic_bp || 
      ', HR: ' || NEW.heart_rate || ', SpO2: ' || NEW.oxygen_saturation || '%. Immediate assessment required.'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Function to check for missing data
CREATE OR REPLACE FUNCTION public.check_missing_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  patient_record RECORD;
BEGIN
  -- Check for patients without recent vital signs (>7 days)
  FOR patient_record IN
    SELECT p.id, p.first_name, p.last_name
    FROM public.patients p
    LEFT JOIN public.vital_signs vs ON p.id = vs.patient_id AND vs.recorded_at > NOW() - INTERVAL '7 days'
    WHERE vs.id IS NULL
  LOOP
    -- Insert alert if not already exists for this patient
    INSERT INTO public.alerts (
      patient_id,
      alert_type,
      severity,
      message
    )
    SELECT 
      patient_record.id,
      'missing_data',
      'medium',
      'Missing vital signs data for ' || patient_record.first_name || ' ' || patient_record.last_name || '. No readings in the past 7 days.'
    WHERE NOT EXISTS (
      SELECT 1 FROM public.alerts 
      WHERE patient_id = patient_record.id 
      AND alert_type = 'missing_data' 
      AND is_acknowledged = false
      AND created_at > NOW() - INTERVAL '7 days'
    );
  END LOOP;
END;
$$;

-- Create triggers
DROP TRIGGER IF EXISTS risk_assessment_alert_trigger ON public.risk_assessments;
CREATE TRIGGER risk_assessment_alert_trigger
  AFTER INSERT ON public.risk_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_risk_alerts();

DROP TRIGGER IF EXISTS vital_signs_alert_trigger ON public.vital_signs;
CREATE TRIGGER vital_signs_alert_trigger
  AFTER INSERT ON public.vital_signs
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_vitals_alerts();
