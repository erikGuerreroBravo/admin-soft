import { Injectable } from '@angular/core';
import { AuthState } from '../domain/auth.models';

const STORAGE_KEY = 'seph.principal.session';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  read(): AuthState | null {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as AuthState;
    } catch {
      this.clear();
      return null;
    }
  }

  write(state: AuthState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
