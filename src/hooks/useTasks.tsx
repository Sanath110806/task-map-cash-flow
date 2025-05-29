
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  estimated_time?: string;
  urgency?: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  poster_id: string;
  assigned_worker_id?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    rating: number;
  };
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          profiles:poster_id (
            first_name,
            last_name,
            rating
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, error, refetch: fetchTasks };
};
