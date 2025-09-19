const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';
async function request(path, { token, headers, ...init } = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (!res.ok) {
        let errorBody;
        try {
            errorBody = await res.json();
        }
        catch (error) {
            // ignore
        }
        throw new Error(typeof errorBody === 'object' && errorBody !== null && 'message' in errorBody
            ? String(errorBody.message)
            : `Richiesta fallita con status ${res.status}`);
    }
    if (res.status === 204) {
        return undefined;
    }
    return (await res.json());
}
export const apiClient = {
    get: (path, options) => request(path, { ...options, method: 'GET' }),
    post: (path, body, options) => request(path, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
    put: (path, body, options) => request(path, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
    delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
