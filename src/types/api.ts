export type Address = { zip_code?: string; street?: string; number?: string; complement?: string; neighborhood?: string; city?: string; state?: string }
export type UserInput = { name: string; zip_code: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string }
export type User = Address & { id: string; name: string; email: string; is_active: boolean; created_at: string; updated_at: string }
export type Session = { id: string; expires_at: string; revoked_at: string | null; created_at: string; last_used_at: string; user_agent: string | null }
export type ApiKey = { id: string; public_key_id: string; name: string; is_active: boolean; revoked_at: string | null; created_at: string; last_used_at: string | null }
export type ApiKeyCreated = ApiKey & { secret: string }
