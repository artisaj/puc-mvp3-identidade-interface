import type { Address, Session, User, UserInput } from '../types/api'

const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')
let accessToken: string | null = null

export class ApiError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export function setAccessToken(token: string | null) { accessToken = token }

async function request<T>(path: string, options: RequestInit = {}, requiresAuth = false): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body) headers.set('Content-Type', 'application/json')
  if (requiresAuth && accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
  let response: Response
  try {
    response = await fetch(`${apiUrl}${path}`, { ...options, headers, credentials: 'include' })
  } catch {
    throw new ApiError('Não foi possível conectar à API. Verifique se ela está disponível.', 0)
  }
  if (!response.ok) {
    let message = 'Não foi possível concluir a solicitação.'
    try { const payload = await response.json() as { detail?: string }; message = payload.detail || message } catch { /* empty or non-JSON error response */ }
    throw new ApiError(message, response.status)
  }
  return response.status === 204 ? undefined as T : response.json() as Promise<T>
}

function clean<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== ''))
}

export const api = {
  async register(payload: UserInput & { email: string; password: string }) { return request<User>('/auth/register', { method: 'POST', body: JSON.stringify(clean(payload)) }) },
  async login(email: string, password: string) { const token = await request<{ access_token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setAccessToken(token.access_token) },
  forgotPassword: (email: string) => request<{ accepted: true; reset_token?: string }>('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token: string, newPassword: string) => request<void>('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, new_password: newPassword }) }),
  async refresh() { const token = await request<{ access_token: string }>('/auth/refresh', { method: 'POST' }); setAccessToken(token.access_token) },
  async logout() { await request<void>('/auth/logout', { method: 'POST' }) },
  getProfile: () => request<User>('/users/me', {}, true),
  updateProfile: (payload: UserInput) => request<User>('/users/me', { method: 'PUT', body: JSON.stringify(clean(payload)) }, true),
  lookupAddress: (zipCode: string) => request<Address>(`/addresses/lookup/${encodeURIComponent(zipCode)}`),
  getSessions: () => request<Session[]>('/sessions', {}, true),
  deleteSession: (id: string) => request<void>(`/sessions/${encodeURIComponent(id)}`, { method: 'DELETE' }, true),
}
