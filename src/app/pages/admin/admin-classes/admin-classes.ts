import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-classes.html',
  styleUrl: './admin-classes.css'
})
export class AdminClassesComponent implements OnInit {
  classes: any[] = [];
  loading = true;
  saving = false;
  showModal = false;

  currentClass: any = {
    id: null,
    classNumber: 1,
    title: '',
    moduleName: 'Módulo 1: Java Core & POO Profesional',
    description: '',
    videoUrl: '',
    slidesUrl: '',
    isCompleted: false,
    hasAssignment: false,
    assignmentTitle: '',
    assignmentDescription: ''
  };

  modulesList = [
    'Módulo 1: Java Core & POO Profesional',
    'Módulo 2: Spring Boot 3 & REST APIs',
    'Módulo 3: Microservicios & Spring Cloud',
    'Módulo 4: AWS, Docker & Proyecto Final'
  ];

  toastMessage = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.loading = true;
    this.apiService.getAdminClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar clases', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreateModal(): void {
    this.currentClass = {
      id: null,
      classNumber: this.classes.length + 1,
      title: '',
      moduleName: this.modulesList[0],
      description: '',
      videoUrl: '',
      slidesUrl: '',
      isCompleted: false,
      hasAssignment: false,
      assignmentTitle: '',
      assignmentDescription: ''
    };
    this.showModal = true;
  }

  openEditModal(item: any): void {
    this.currentClass = { ...item };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveClass(): void {
    if (!this.currentClass.title) return;
    this.saving = true;

    this.apiService.createOrUpdateClass(this.currentClass).subscribe({
      next: () => {
        this.saving = false;
        this.showToast('Clase guardada exitosamente.');
        this.closeModal();
        this.loadClasses();
      },
      error: () => {
        this.saving = false;
        this.showToast('Error al guardar la clase.');
      }
    });
  }

  deleteClass(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta clase?')) return;
    this.apiService.deleteClass(id).subscribe({
      next: () => {
        this.showToast('Clase eliminada.');
        this.loadClasses();
      }
    });
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 4000);
  }
}
