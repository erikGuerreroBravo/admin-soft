import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { API_BASE_URL } from '../../config/api.config';
import { ResponseWrapper } from '../../../shared/models/response-wrapper.model';
import { AuthResponse, LoginRequest, UserSession } from '../domain/auth.models';
import { environment } from '../../../../environments/environment';

const mockUser: UserSession = {
  id: '6bd5a49e-78f3-4c25-90e4-fb881fe87b19',
  email: 'admin@seph.local',
  fullName: 'Administrador SEPH',
  roles: ['SuperAdmin', 'SecurityAdmin'],
  permissions: ['security.admin', 'users.read', 'dashboard.read']
};

function createMockAuthResponse(): AuthResponse {
  return {
    accessToken: 'mock-access-token-for-frontend-only-execution',
    refreshToken: crypto.randomUUID(),
    expiresAtUtc: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    user: mockUser
  };
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<AuthResponse> {
    if (environment.useMockApi) {
      return of(createMockAuthResponse()).pipe(delay(350));
    }

    return this.http
      .post<ResponseWrapper<AuthResponse>>(`${API_BASE_URL}/Auth/login`, request)
      .pipe(map((response) => response.data));
  }

  refresh(refreshToken: string): Observable<AuthResponse> {
    if (environment.useMockApi) {
      return of(createMockAuthResponse()).pipe(delay(150));
    }

    return this.http
      .post<ResponseWrapper<AuthResponse>>(`${API_BASE_URL}/Auth/refresh-token`, { refreshToken })
      .pipe(map((response) => response.data));
  }

  me(): Observable<UserSession> {
    if (environment.useMockApi) {
      return of(mockUser).pipe(delay(150));
    }

    return this.http
      .get<ResponseWrapper<UserSession>>(`${API_BASE_URL}/Users/me`)
      .pipe(map((response) => response.data));
  }

  logout(refreshToken: string): Observable<boolean> {
    if (environment.useMockApi) {
      return of(true).pipe(delay(100));
    }

    return this.http
      .post<ResponseWrapper<boolean>>(`${API_BASE_URL}/Auth/logout`, { refreshToken })
      .pipe(map((response) => response.data));
  }
}
