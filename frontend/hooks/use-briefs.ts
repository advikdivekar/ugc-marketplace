import { useState, useCallback } from 'react';
import { fetchAuth } from '../lib/api';
import { Brief, BriefCreate } from '../types';

export function useBriefs() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBriefs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuth('/api/briefs');
      setBriefs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch briefs.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBriefById = useCallback(async (id: string): Promise<Brief | null> => {
    try {
      return await fetchAuth(`/api/briefs/${id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch brief details.');
      return null;
    }
  }, []);

  const createBrief = useCallback(async (data: BriefCreate) => {
    setLoading(true);
    setError(null);
    try {
      const newBrief = await fetchAuth('/api/briefs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setBriefs((prev) => [newBrief, ...prev]);
      return newBrief;
    } catch (err: any) {
      setError(err.message || 'Failed to create brief.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    briefs,
    loading,
    error,
    fetchAllBriefs,
    fetchBriefById,
    createBrief,
  };
}
