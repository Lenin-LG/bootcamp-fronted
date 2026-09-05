import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-student-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-payments.html',
  styleUrl: './student-payments.css'
})
export class StudentPaymentsComponent implements OnInit {
  installments: any[] = [];
  loading = true;
  payingId: number | null = null;

  // Modal State for Card Binding
  showCardModal = false;
  cardHolder = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  cardBrand = 'Visa';
  savingCard = false;
  linkedCardInfo = 'Mercado Pago (Tarjeta Débito/Crédito)';

  toastMessage = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

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
    this.apiService.createCheckoutPreference(inst.id).subscribe({
      next: (res) => {
        this.payingId = null;
        if (res && res.initPoint) {
          window.location.href = res.initPoint;
        } else {
          this.showToast('Pasarela Mercado Pago iniciada. Redirigiendo...');
        }
      },
      error: (err) => {
        this.payingId = null;
        this.showToast('Conectando con Mercado Pago Developers...');
      }
    });
  }

  openCardModal(): void {
    this.showCardModal = true;
  }

  closeCardModal(): void {
    this.showCardModal = false;
  }

  savePaymentCard(): void {
    if (!this.cardNumber || !this.cardHolder) return;
    this.savingCard = true;

    const lastFour = this.cardNumber.length >= 4 ? this.cardNumber.slice(-4) : '4242';

    this.apiService.addPaymentMethod({
      cardHolder: this.cardHolder,
      lastFour: lastFour,
      brand: this.cardBrand,
      mpPaymentMethodId: 'credit_card'
    }).subscribe({
      next: () => {
        this.savingCard = false;
        this.linkedCardInfo = `${this.cardBrand} **** ${lastFour} (Mercado Pago)`;
        this.showToast('¡Tarjeta vinculada con Mercado Pago exitosamente!');
        this.closeCardModal();
      },
      error: () => {
        this.savingCard = false;
        this.showToast('Error al registrar la tarjeta en Mercado Pago.');
      }
    });
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 4000);
  }
}
