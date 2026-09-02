import { Injectable, signal } from '@angular/core';

export type ConfirmVariant = 'primary' | 'warning' | 'danger';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  /** primary = mint (acción positiva), warning = ámbar (pausas/énfasis), danger = rojo (acción destructiva/error real) */
  variant?: ConfirmVariant;
}

interface ConfirmState extends Required<ConfirmOptions> {}

/**
 * Reemplazo de window.confirm() para decisiones del usuario.
 * Úsalo cuando la acción tiene una consecuencia real que conviene
 * confirmar explícitamente (aprobar, activar cobros, pausar, etc.)
 * en vez de una simple notificación (eso va en ToastService).
 */
@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  readonly state = signal<ConfirmState | null>(null);
  private resolver: ((value: boolean) => void) | null = null;

  ask(options: ConfirmOptions): Promise<boolean> {
    this.state.set({
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      variant: 'primary',
      ...options,
    });
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  respond(value: boolean): void {
    this.state.set(null);
    if (this.resolver) {
      this.resolver(value);
      this.resolver = null;
    }
  }
}
