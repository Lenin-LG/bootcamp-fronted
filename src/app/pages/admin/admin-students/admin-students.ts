import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css'
})
export class AdminStudentsComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  searchTerm = '';
  loading = true;

  selectedStudent: any = null;
  detailLoading = false;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.apiService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.applyFilter();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredStudents = this.students;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(s => 
        s.fullName.toLowerCase().includes(term) || 
        s.email.toLowerCase().includes(term)
      );
    }
  }

  viewDetail(profileId: number): void {
    this.detailLoading = true;
    this.showModal = true;
    this.apiService.getStudentDetail(profileId).subscribe({
      next: (detail) => {
        this.selectedStudent = detail;
        this.detailLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.detailLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedStudent = null;
  }

  async approveApplication(userId: number): Promise<void> {
    const ok = await this.confirmDialog.ask({
      title: 'Aprobar postulación',
      message: 'El alumno podrá iniciar sesión de inmediato y acceder a la plataforma.',
      confirmText: 'Sí, aprobar',
      variant: 'primary'
    });
    if (!ok) return;

    this.apiService.updateApprovalStatus(userId, 'APROBADO').subscribe({
      next: () => {
        this.toast.success('Postulación aprobada exitosamente.');
        this.loadStudents();
        if (this.selectedStudent) this.viewDetail(this.selectedStudent.id);
      }
    });
  }

  async changeContractStatus(contractStatus: string, employmentStatus: string): Promise<void> {
    if (!this.selectedStudent) return;
    const isActivating = contractStatus === 'COBRANDO_ACTIVO';

    const ok = await this.confirmDialog.ask({
      title: isActivating ? 'Activar cobros' : 'Pausar contrato',
      message: isActivating
        ? '¿Deseas activar el contrato y la cobranza de cuotas para este alumno?'
        : '¿Deseas pausar el contrato por desempleo/pérdida de empleo?',
      confirmText: isActivating ? 'Sí, activar' : 'Sí, pausar',
      variant: isActivating ? 'primary' : 'warning'
    });
    if (!ok) return;

    this.apiService.updateContractStatus(this.selectedStudent.id, {
      contractStatus,
      employmentStatus
    }).subscribe({
      next: () => {
        this.toast.success('Estado de contrato actualizado correctamente.');
        this.loadStudents();
        this.viewDetail(this.selectedStudent.id);
      }
    });
  }
}
