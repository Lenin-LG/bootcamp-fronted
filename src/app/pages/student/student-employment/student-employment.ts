import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-student-employment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-employment.html',
  styleUrl: './student-employment.css'
})
export class StudentEmploymentComponent implements OnInit {
  reports: any[] = [];
  loading = true;
  submitting = false;

  showModal = false;
  reportType: 'CONSEGUI_TRABAJO' | 'PERDI_TRABAJO' = 'CONSEGUI_TRABAJO';

  companyName = '';
  position = '';
  startDateStr = '';
  notes = '';

  constructor(private apiService: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.apiService.getStudentEmploymentReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openReportModal(type: 'CONSEGUI_TRABAJO' | 'PERDI_TRABAJO'): void {
    this.reportType = type;
    this.companyName = '';
    this.position = '';
    this.startDateStr = '';
    this.notes = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitReport(): void {
    this.submitting = true;
    this.apiService.submitEmploymentReport({
      reportType: this.reportType,
      companyName: this.companyName,
      position: this.position,
      startOrEndDate: this.startDateStr || null,
      notes: this.notes
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.closeModal();
        this.toast.success('Solicitud reportada exitosamente al equipo de Órbita Solutions.');
        this.loadReports();
      },
      error: (err) => {
        this.submitting = false;
        this.toast.error('Error al enviar el reporte: ' + (err.error?.message || 'Revisar datos'));
      }
    });
  }
}
