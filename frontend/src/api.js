const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erreur');
  return data;
}

export const register = (body) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const login = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) });
export const getProfile = () => request('/profile');
export const updateProfile = (body) =>
  request('/profile', { method: 'PUT', body: JSON.stringify(body) });
