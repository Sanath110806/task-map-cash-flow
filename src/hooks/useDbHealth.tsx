
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDbHealth = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkDbHealth = async () => {
      try {
        // Try to query the profiles table to see if it exists
        const { error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);

        if (error) {
          setError(`Database error: ${error.message}`);
          setIsHealthy(false);
        } else {
          setIsHealthy(true);
          setError(null);
        }
      } catch (err) {
        setError('Failed to connect to database');
        setIsHealthy(false);
      }
    };

    checkDbHealth();
  }, []);

  return { isHealthy, error };
};
