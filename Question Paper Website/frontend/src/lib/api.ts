const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
    token?: string | null;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
        credentials: 'include',
        mode: 'cors',
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
}

// Papers API
export const papersAPI = {
    getAll: async (params?: Record<string, string | number>) => {
        const queryString = params
            ? '?' + new URLSearchParams(params as Record<string, string>).toString()
            : '';
        return fetchAPI(`/api/papers${queryString}`);
    },

    getById: async (id: string) => {
        return fetchAPI(`/api/papers/${id}`);
    },

    getPopular: async (limit = 10) => {
        return fetchAPI(`/api/papers/popular?limit=${limit}`);
    },

    getRecent: async (limit = 10) => {
        return fetchAPI(`/api/papers/recent?limit=${limit}`);
    },

    create: async (formData: FormData, token: string) => {
        const res = await fetch(`${API_URL}/api/papers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
            credentials: 'include',
            mode: 'cors',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Upload failed');
        return data;
    },

    update: async (id: string, data: Record<string, unknown>, token: string) => {
        return fetchAPI(`/api/papers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            token,
        });
    },

    delete: async (id: string, token: string) => {
        return fetchAPI(`/api/papers/${id}`, {
            method: 'DELETE',
            token,
        });
    },

    trackDownload: async (id: string) => {
        return fetchAPI(`/api/papers/${id}/download`, {
            method: 'POST',
        });
    },
};

// Search API
export const searchAPI = {
    search: async (query: string, params?: Record<string, string | number>) => {
        const allParams = { q: query, ...params };
        const queryString = new URLSearchParams(allParams as Record<string, string>).toString();
        return fetchAPI(`/api/search?${queryString}`);
    },

    autocomplete: async (query: string) => {
        return fetchAPI(`/api/search/autocomplete?q=${encodeURIComponent(query)}`);
    },
};

// Admin API
export const adminAPI = {
    getStats: async (token: string) => {
        return fetchAPI('/api/admin/stats', { token });
    },

    getUsers: async (token: string, params?: Record<string, string | number>) => {
        const queryString = params
            ? '?' + new URLSearchParams(params as Record<string, string>).toString()
            : '';
        return fetchAPI(`/api/admin/users${queryString}`, { token });
    },

    toggleUserStatus: async (userId: string, token: string) => {
        return fetchAPI(`/api/admin/users/${userId}/toggle`, {
            method: 'PUT',
            token,
        });
    },

    createAdmin: async (data: { name: string; email: string; password: string }, token: string) => {
        return fetchAPI('/api/admin/users/admin', {
            method: 'POST',
            body: JSON.stringify(data),
            token,
        });
    },
};
