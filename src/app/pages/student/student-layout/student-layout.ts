import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Logo } from '../../../shared/logo/logo';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, Logo],
  templateUrl: './student-layout.html',
  styleUrl: './student-layout.css'
})
export class StudentLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get user() {
    return this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
