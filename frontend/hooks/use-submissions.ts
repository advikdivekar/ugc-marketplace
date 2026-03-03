import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiClient } from '../lib/api';
import { Submission, SubmissionCreate, SubmissionStatusUpdate } from '../types';

export function useSubmissions() {
  const { getToken } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissionsByBrief = useCallback(async (briefId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken() ?? undefined;
      const data = await apiClient<Submission[]>(`/submissions/?brief_id=${briefId}`, { token });
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch submissions.');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const createSubmission = useCallback(async (data: SubmissionCreate) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken() ?? undefined;
      const newSubmission = await apiClient<Submission>('/api/submissions/', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      });
      setSubmissions((prev) => [newSubmission, ...prev]);
      return newSubmission;
    } catch (err: any) {
      setError(err.message || 'Failed to create submission.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const updateSubmissionStatus = useCallback(async (id: string, data: SubmissionStatusUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken() ?? undefined;
      const updated = await apiClient<Submission>(`/api/submissions/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        token,
      });
      setSubmissions((prev) => prev.map(sub => sub.id === id ? updated : sub));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update submission status.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  return {
    submissions,
    loading,
    error,
    fetchSubmissionsByBrief,
    createSubmission,
    updateSubmissionStatus,
  };
}
