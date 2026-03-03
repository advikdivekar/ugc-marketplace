'use client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiClient<T = unknown>(endpoint: string, options: RequestInit & { token?: string } = {}): Promise<T> {
    const { token: manualToken, ...fetchOptions } = options;

    // Client-side fallback: get token from Clerk if not provided manually
    let token = manualToken;

    if (!token && typeof window !== 'undefined' && window.Clerk?.session) {
        token = await window.Clerk.session.getToken() ?? undefined;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...fetchOptions.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: 'Request failed' }));
        throw new Error(error.detail || `API error ${res.status}`);
    }

    return res.json();
}

// Extend Window interface for Clerk
declare global {
    interface Window {
        Clerk?: {
            session?: {
                getToken: () => Promise<string | null>;
            };
        };
        Razorpay?: new (options: Record<string, unknown>) => {
            open: () => void;
        };
    }
}
