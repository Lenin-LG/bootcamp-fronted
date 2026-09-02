import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const WEB3FORMS_ACCESS_KEY = '0861a99e-c4ae-409b-8d58-220a609504d9';

@Component({
  selector: 'app-cta',
  imports: [FormsModule],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta {
  name = '';
  email = '';
  phone = '';
  honeypot = ''; // campo trampa anti-bots: si un bot lo llena, descartamos el envío
  submitted = signal(false);
  sending = signal(false);
  error = signal(false);

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.name || !this.email || !this.phone) return;
    if (this.honeypot) return; // bot detectado, no enviamos nada

    this.sending.set(true);
    this.error.set(false);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'Nueva postulación al bootcamp',
      from_name: 'Landing Bootcamp Java & Spring Cloud',
      name: this.name,
      email: this.email,
      phone: this.phone,
    };

    this.http.post('https://api.web3forms.com/submit', payload).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.error.set(true);
      },
    });
  }
}
