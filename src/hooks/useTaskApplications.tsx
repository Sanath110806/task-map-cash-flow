
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useTaskApplications = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const applyForTask = async (taskId: string, message?: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('task_applications')
        .insert({
          task_id: taskId,
          worker_id: user.id,
          message: message || ''
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsForTask = async (taskId: string) => {
    const { data, error } = await supabase
      .from('task_applications')
      .select(`
        *,
        profiles:worker_id (
          first_name,
          last_name,
          rating,
          latitude,
          longitude
        )
      `)
      .eq('task_id', taskId);

    if (error) throw error;
    return data || [];
  };

  return {
    applyForTask,
    getApplicationsForTask,
    loading
  };
};
