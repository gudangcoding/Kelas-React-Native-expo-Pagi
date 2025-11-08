const BASE_URL = 'http://localhost:8000/api';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  token?: string | null;
};

const memoryStore: Record<string, string> = {};

function getLocalStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch {}
  return null;
}

export const TokenStorage = {
  setToken(token: string) {
    const ls = getLocalStorage();
    if (ls) ls.setItem('auth_token', token);
    else memoryStore['auth_token'] = token;
  },
  getToken(): string | null {
    const ls = getLocalStorage();
    if (ls) return ls.getItem('auth_token');
    return memoryStore['auth_token'] ?? null;
  },
  clear() {
    const ls = getLocalStorage();
    if (ls) ls.removeItem('auth_token');
    delete memoryStore['auth_token'];
  },
};

export async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<{ ok: boolean; status: number; data: T }> {
  const token = opts.token ?? TokenStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...opts.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = text as any; }
  return { ok: res.ok, status: res.status, data: json as T };
}

// Auth endpoints
export async function register(payload: { name: string; email: string; password: string; c_password: string; }) {
  return apiFetch('/register', { method: 'POST', body: payload });
}

export async function login(payload: { email: string; password: string; }) {
  const res = await apiFetch<{ success?: boolean; token?: string; user?: any; message?: string; error?: any }>('/login', { method: 'POST', body: payload });
  if (res.ok && res.status === 201 && res.data?.token) {
    TokenStorage.setToken(res.data.token);
  }
  return res;
}

export async function logout() {
  const res = await apiFetch<{ message?: string }>('/v1/logout', { method: 'POST' });
  if (res.ok) TokenStorage.clear();
  return res;
}

export async function getProfile(id: string) {
  return apiFetch(`/v1/profile/${id}`, { method: 'GET' });
}

// Catalog & locations
export async function getCategories() {
  return apiFetch('/v1/categories', { method: 'GET' });
}

export async function getProvinces() {
  return apiFetch('/v1/provinces', { method: 'GET' });
}

export async function getCities(params?: { province_id?: string }) {
  const q = params?.province_id ? `?province_id=${encodeURIComponent(params.province_id)}` : '';
  return apiFetch(`/v1/cities${q}`, { method: 'GET' });
}

// Products
export async function getProducts() {
  return apiFetch('/v1/products', { method: 'GET' });
}

export async function searchProducts(query: string) {
  const q = query ? `?query=${encodeURIComponent(query)}` : '';
  return apiFetch(`/v1/products/search${q}`, { method: 'GET' });
}

// Product details
export async function getProductById(id: string) {
  return apiFetch(`/v1/products/${id}`, { method: 'GET' });
}

export async function getProductVariants(id: string) {
  return apiFetch(`/v1/products/${id}/variants`, { method: 'GET' });
}

// Order examples (stubs aligned to docs signatures)
export async function refundOrder(orderId: string) {
  return apiFetch(`/v1/order/${orderId}/refund`, { method: 'POST' });
}

export async function paymentCallback() {
  return apiFetch('/v1/order/payment-callback', { method: 'GET' });
}

export async function createOrder(payload: any) {
  return apiFetch('/v1/order/create-order', { method: 'POST', body: payload });
}

// Utility to check auth
export function isAuthenticated() {
  return !!TokenStorage.getToken();
}

export default {
  register,
  login,
  logout,
  getProfile,
  getCategories,
  getProvinces,
  getCities,
  getProducts,
  searchProducts,
  getProductById,
  getProductVariants,
  refundOrder,
  paymentCallback,
  createOrder,
  isAuthenticated,
  TokenStorage,
};