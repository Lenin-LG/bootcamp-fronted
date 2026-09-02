import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Logo],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isEvaluationAlert = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isEvaluationAlert = false;

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese su correo y contraseña.';
      return;
    }

    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/alumno/inicio']);
        }
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.message || 'Error al iniciar sesión.';
        this.errorMessage = msg;
        if (err.status === 403 || msg.toLowerCase().includes('evaluación')) {
          this.isEvaluationAlert = true;
        }
      }
    });
  }
}
