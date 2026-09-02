import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent implements OnInit {
  phone = '';
  documentNumber = '';
  cvUrl = '';

  saving = false;
  successMessage = '';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get user() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    const u = this.user();
    if (u) {
      this.phone = '';
      this.documentNumber = '';
    }
  }

  saveProfile(): void {
    this.saving = true;
    this.successMessage = '';

    this.apiService.updateStudentProfile({
      phone: this.phone,
      documentNumber: this.documentNumber,
      cvUrl: this.cvUrl
    }).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = 'Perfil actualizado exitosamente.';
      },
      error: () => this.saving = false
    });
  }
}
