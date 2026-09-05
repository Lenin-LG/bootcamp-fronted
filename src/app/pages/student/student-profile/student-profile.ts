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
  uploadingCv = false;
  successMessage = '';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get user() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    this.apiService.getStudentDashboard().subscribe({
      next: (data) => {
        if (data) {
          this.phone = data.phone || '+51 987 654 321';
          this.documentNumber = data.documentNumber || '72819034';
          this.cvUrl = data.cvUrl || '';
        }
      },
      error: () => {
        this.phone = '+51 987 654 321';
        this.documentNumber = '72819034';
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target?.files?.[0];
    if (!file) return;

    this.uploadingCv = true;
    this.successMessage = '';

    this.apiService.uploadDocument(file, 'cvs').subscribe({
      next: (res) => {
        this.uploadingCv = false;
        this.cvUrl = res.fileUrl;
        this.successMessage = '¡Archivo subido exitosamente a AWS S3!';
      },
      error: (err) => {
        this.uploadingCv = false;
        this.successMessage = '';
        alert('Error al subir el archivo a AWS S3: ' + (err.error?.message || err.message));
      }
    });
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

  downloadDocument(docName: string): void {
    const url = this.apiService.getDocumentDownloadUrl(docName);
    window.open(url, '_blank');
  }
}
