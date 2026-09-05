import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-student-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-progress.html',
  styleUrl: './student-progress.css'
})
export class StudentProgressComponent implements OnInit {
  progressData: any = null;
  loading = true;
  selectedModule: any = null;

  // Task Submission Modal State
  showTaskModal = false;
  activeClassForTask: any = null;
  repositoryUrl = '';
  submissionNotes = '';
  fileUrl = '';
  submitting = false;
  toastMessage = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    this.loading = true;
    this.apiService.getCourseProgress().subscribe({
      next: (data) => {
        this.progressData = data;
        if (data && data.modules && data.modules.length > 0) {
          this.selectedModule = data.modules[0];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar progreso', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectModule(mod: any): void {
    this.selectedModule = mod;
  }

  openTaskModal(clazz: any): void {
    this.activeClassForTask = clazz;
    if (clazz.submission) {
      this.repositoryUrl = clazz.submission.repositoryUrl || '';
      this.submissionNotes = clazz.submission.notes || '';
      this.fileUrl = clazz.submission.fileUrl || '';
    } else {
      this.repositoryUrl = '';
      this.submissionNotes = '';
      this.fileUrl = '';
    }
    this.showTaskModal = true;
  }

  closeTaskModal(): void {
    this.showTaskModal = false;
    this.activeClassForTask = null;
  }

  submitTask(): void {
    if (!this.activeClassForTask) return;
    this.submitting = true;

    this.apiService.submitTask({
      classId: this.activeClassForTask.id,
      repositoryUrl: this.repositoryUrl,
      notes: this.submissionNotes,
      fileUrl: this.fileUrl
    }).subscribe({
      next: (res) => {
        this.submitting = false;
        this.activeClassForTask.submission = res;
        this.showToast('¡Tarea entregada exitosamente!');
        this.closeTaskModal();
        this.loadProgress();
      },
      error: (err) => {
        this.submitting = false;
        this.showToast('Error al enviar la tarea. Revisa los datos.');
      }
    });
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
}
