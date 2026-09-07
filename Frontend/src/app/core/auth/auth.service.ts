import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id_usuario: number;
  username: string;
  id_rol: number;
  nombre?: string;
  apellido?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado global usando Signals
  private state = signal<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });

  // Selectores computados expuestos al exterior
  readonly user = computed(() => this.state().user);
  readonly token = computed(() => this.state().token);
  readonly isAuthenticated = computed(() => this.state().isAuthenticated);

  constructor() {
    this.checkInitialSession();
  }

  private checkInitialSession() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.state.set({ user, token, isAuthenticated: true });
      } catch (e) {
        this.logout();
      }
    }
  }

  loginSuccess(user: User, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.state.set({ user, token, isAuthenticated: true });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.state.set({ user: null, token: null, isAuthenticated: false });
  }
}
