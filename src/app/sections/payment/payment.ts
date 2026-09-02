import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  reasons = [
    { title: 'Sin deudas por adelantado', desc: 'No arriesgas tu bolsillo si aún no tienes ingresos.' },
    { title: 'Incentivo alineado', desc: 'Nos esforzamos en tu empleabilidad porque así también ganamos.' },
    { title: 'Cuotas justas', desc: 'Se calculan según tu sueldo real, no un monto fijo agresivo.' },
  ];
}
