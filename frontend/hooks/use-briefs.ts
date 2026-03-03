import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiClient } from '../lib/api';
import { Brief, BriefCreate } from '../types';

export function useBriefs() {
  const { getToken } = useAuth();
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBriefs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken() ?? undefined;
      const data = await apiClient<Brief[]>('/briefs', { token });
      setBriefs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch briefs.');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const fetchBriefById = useCallback(async (id: string): Promise<Brief | null> => {
    try {
      const token = await getToken() ?? undefined;
      return await apiClient<Brief>(`/api/briefs/${id}`, { token });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch brief details.');
      return null;
    }
  }, [getToken]);

  const createBrief = useCallback(async (data: BriefCreate) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken() ?? undefined;
      const newBrief = await apiClient<Brief>('/api/briefs', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      });
      setBriefs((prev) => [newBrief, ...prev]);
      return newBrief;
    } catch (err: any) {
      setError(err.message || 'Failed to create brief.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  return {
    briefs,
    loading,
    error,
    fetchAllBriefs,
    fetchBriefById,
    createBrief,
  };
}
