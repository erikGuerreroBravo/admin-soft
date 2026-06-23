export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAtUtc: string;
  user: UserSession;
}

export interface AuthState {
  user: UserSession | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAtUtc: string | null;
  status: 'anonymous' | 'authenticated' | 'loading';
}
