import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Inicializa leyendo el localStorage o las preferencias del sistema
  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // Signal reactivo para el estado global del tema
  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    // Efecto que reacciona a los cambios en currentTheme para actualizar el DOM y localStorage
    effect(() => {
      const theme = this.currentTheme();
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    this.currentTheme.update(theme => theme === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: ThemeMode) {
    this.currentTheme.set(theme);
  }
}
