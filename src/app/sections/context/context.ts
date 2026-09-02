import { Component } from '@angular/core';

@Component({
  selector: 'app-context',
  imports: [],
  templateUrl: './context.html',
  styleUrl: './context.css',
})
export class Context {
  industries = ['Banca & Fintech', 'Retail & eCommerce', 'Seguros', 'Salud', 'Logística', 'Telecom'];
}
