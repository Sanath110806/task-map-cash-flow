
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Use the actual database types
type TaskStatus = Database['public']['Enums']['task_status'];
type TaskRow = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

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
  status: TaskStatus;
  poster_id?: string;
  assigned_worker_id?: string;
  images?: string[];
  created_at: string;
  updated_at?: string;
  profiles?: {
    first_name: string;
    last_name: string;
    rating: number;
  } | null;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          poster_profile:profiles!poster_id (
            first_name,
            last_name,
            rating
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Task interface
      const typedTasks: Task[] = (data || []).map(task => ({
        ...task,
        profiles: task.poster_profile ? {
          first_name: task.poster_profile.first_name,
          last_name: task.poster_profile.last_name,
          rating: task.poster_profile.rating || 0
        } : null
      }));
      
      setTasks(typedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<TaskInsert, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh tasks after creating
      await fetchTasks();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask
  };
};
