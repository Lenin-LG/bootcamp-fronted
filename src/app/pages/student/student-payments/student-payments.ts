import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-student-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-payments.html',
  styleUrl: './student-payments.css'
})
export class StudentPaymentsComponent implements OnInit {
  installments: any[] = [];
  loading = true;
  payingId: number | null = null;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadInstallments();
  }

  loadInstallments(): void {
    this.loading = true;
    this.apiService.getStudentInstallments().subscribe({
      next: (data) => {
        this.installments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  payWithMercadoPago(inst: any): void {
    this.payingId = inst.id;
    this.cdr.detectChanges();
    this.apiService.createCheckoutPreference(inst.id).subscribe({
      next: (res) => {
        this.payingId = null;
        this.cdr.detectChanges();
        if (res.initPoint) {
          window.open(res.initPoint, '_blank');
        } else {
          this.toast.info('Se generó la preferencia de pago para la cuota ' + inst.installmentNumber);
        }
      },
      error: (err) => {
        this.payingId = null;
        this.cdr.detectChanges();
        this.toast.error('Error al iniciar el pago con Mercado Pago: ' + (err.error?.message || 'Error de conexión'));
      }
    });
  }

  async confirmSimulatedPayment(inst: any): Promise<void> {
    const ok = await this.confirmDialog.ask({
      title: 'Confirmar pago',
      message: `¿Confirmar pago simulado para la cuota ${inst.installmentNumber}/12 por S/ ${inst.amount}?`,
      confirmText: 'Sí, pagar',
      variant: 'primary'
    });
    if (!ok) return;

    const loadingId = this.toast.loading('Procesando pago simulado...');
    this.apiService.confirmSimulatedPayment(inst.id).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', `¡Pago acreditado con éxito para la cuota ${inst.installmentNumber}/12!`);
        this.loadInstallments();
      },
      error: (err) => {
        this.toast.update(loadingId, 'error', 'No se pudo confirmar el pago simulado: ' + (err.error?.message || 'Error de conexión'));
      }
    });
  }
}
