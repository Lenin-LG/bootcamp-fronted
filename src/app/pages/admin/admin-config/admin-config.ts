import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-config.html',
  styleUrl: './admin-config.css'
})
export class AdminConfigComponent implements OnInit {
  config: any = {
    installmentAmount: '850.00',
    totalInstallments: '12',
    receivingAccount: 'softwareorbita@gmail.com',
    mpPublicKey: '',
    mpAccessToken: ''
  };

  loading = true;
  saving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(): void {
    this.loading = true;
    this.apiService.getConfig().subscribe({
      next: (data) => {
        this.config = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveConfig(): void {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.apiService.updateConfig(this.config).subscribe({
      next: (updated) => {
        this.config = updated;
        this.saving = false;
        this.successMessage = 'Configuración actualizada exitosamente.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = 'Error al guardar la configuración.';
        this.cdr.detectChanges();
      }
    });
  }
}
