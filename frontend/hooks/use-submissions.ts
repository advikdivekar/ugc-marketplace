import { useState, useCallback } from 'react';
import { fetchAuth } from '../lib/api';
import { Submission, SubmissionCreate, SubmissionStatusUpdate } from '../types';

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissionsByBrief = useCallback(async (briefId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuth(`/api/submissions/?brief_id=${briefId}`);
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch submissions.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSubmission = useCallback(async (data: SubmissionCreate) => {
    setLoading(true);
    setError(null);
    try {
      const newSubmission = await fetchAuth('/api/submissions/', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setSubmissions((prev) => [newSubmission, ...prev]);
      return newSubmission;
    } catch (err: any) {
      setError(err.message || 'Failed to create submission.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSubmissionStatus = useCallback(async (id: string, data: SubmissionStatusUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await fetchAuth(`/api/submissions/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      setSubmissions((prev) => prev.map(sub => sub.id === id ? updated : sub));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update submission status.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submissions,
    loading,
    error,
    fetchSubmissionsByBrief,
    createSubmission,
    updateSubmissionStatus,
  };
}
