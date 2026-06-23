import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { API_BASE_URL } from '../../core/config/api.config';
import { ResponseWrapper } from '../../shared/models/response-wrapper.model';
import { environment } from '../../../environments/environment';

export interface DashboardSummary {
  activeUsers: number;
  activeSessions: number;
  securityAlerts: number;
  apiAvailability: number;
  recentActivities: DashboardActivity[];
}

export interface DashboardActivity {
  title: string;
  actor: string;
  occurredAtUtc: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
}

const mockDashboardSummary: DashboardSummary = {
  activeUsers: 128,
  activeSessions: 42,
  securityAlerts: 3,
  apiAvailability: 99.98,
  recentActivities: [
    { title: 'Inicio de sesión administrativo', actor: 'admin@seph.local', occurredAtUtc: new Date().toISOString(), severity: 'info' },
    { title: 'Política MFA actualizada', actor: 'security@seph.local', occurredAtUtc: new Date().toISOString(), severity: 'success' },
    { title: 'Intento de acceso bloqueado', actor: 'gateway', occurredAtUtc: new Date().toISOString(), severity: 'warning' }
  ]
};

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly http = inject(HttpClient);

  summary(): Observable<DashboardSummary> {
    if (environment.useMockApi) {
      return of(mockDashboardSummary).pipe(delay(250));
    }

    return this.http
      .get<ResponseWrapper<DashboardSummary>>(`${API_BASE_URL}/Dashboard/summary`)
      .pipe(map((response) => response.data));
  }
}
