import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  /** ms antes de auto-cerrar. 0 = permanece hasta cerrarse manualmente (usado por 'loading'). */
  duration: number;
}

/**
 * Reemplazo de window.alert() para notificaciones no bloqueantes.
 * Úsalo para: confirmaciones de una acción ya ejecutada (success),
 * errores de red/API (error), avisos puntuales (warning/info) y
 * estados de "procesando..." (loading) que luego se resuelven con update().
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<ToastItem[]>([]);

  private push(type: ToastType, message: string, duration: number): number {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, type, message, duration }]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  }

  success(message: string, duration = 4200): number {
    return this.push('success', message, duration);
  }

  error(message: string, duration = 6000): number {
    return this.push('error', message, duration);
  }

  warning(message: string, duration = 5000): number {
    return this.push('warning', message, duration);
  }

  info(message: string, duration = 4500): number {
    return this.push('info', message, duration);
  }

  /** Toast persistente para operaciones en curso. Resuélvelo luego con update(). */
  loading(message: string): number {
    return this.push('loading', message, 0);
  }

  /** Transforma un toast existente (típicamente uno de loading) en su resultado final. */
  update(id: number, type: ToastType, message: string, duration = 4200): void {
    this.toasts.update((list) =>
      list.map((t) => (t.id === id ? { ...t, type, message, duration } : t))
    );
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
