import { computed, Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { AuthApiService } from '../infrastructure/auth-api.service';
import { TokenStorageService } from '../infrastructure/token-storage.service';
import { AuthResponse, AuthState, LoginRequest } from '../domain/auth.models';

const anonymousState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAtUtc: null,
  status: 'anonymous'
};

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly api = inject(AuthApiService);
  private readonly storage = inject(TokenStorageService);
  private readonly router = inject(Router);
  private readonly state = signal<AuthState>(this.storage.read() ?? anonymousState);

  readonly user = computed(() => this.state().user);
  readonly accessToken = computed(() => this.state().accessToken);
  readonly refreshToken = computed(() => this.state().refreshToken);
  readonly isAuthenticated = computed(() => this.state().status === 'authenticated' && !!this.state().accessToken);
  readonly isLoading = computed(() => this.state().status === 'loading');

  login(request: LoginRequest): Observable<AuthResponse> {
    this.state.update((current) => ({ ...current, status: 'loading' }));

    return this.api.login(request).pipe(
      tap((response) => this.setAuthenticated(response)),
      finalize(() => {
        if (this.state().status === 'loading') {
          this.state.set(anonymousState);
        }
      })
    );
  }

  refreshSession(): Observable<AuthResponse | null> {
    const token = this.refreshToken();
    if (!token) {
      return of(null);
    }

    return this.api.refresh(token).pipe(
      tap((response) => this.setAuthenticated(response)),
      catchError((error: unknown) => {
        this.clearSession();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    const token = this.refreshToken();
    if (token) {
      this.api.logout(token).pipe(catchError(() => of(false))).subscribe();
    }

    this.clearSession();
    void this.router.navigate(['/login']);
  }

  hasPermission(permission: string): boolean {
    return this.user()?.permissions.includes(permission) ?? false;
  }

  private setAuthenticated(response: AuthResponse): void {
    const state: AuthState = {
      user: response.user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAtUtc: response.expiresAtUtc,
      status: 'authenticated'
    };

    this.state.set(state);
    this.storage.write(state);
  }

  private clearSession(): void {
    this.state.set(anonymousState);
    this.storage.clear();
  }
}
