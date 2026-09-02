import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  summary: any = null;
  loading = true;
  error = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = '';
    console.log('[DEBUG] AdminDashboardComponent: Cargando métricas desde /api/v1/admin/dashboard...');
    
    this.apiService.getAdminDashboard().subscribe({
      next: (data) => {
        console.log('[DEBUG] AdminDashboardComponent: Datos recibidos exitosamente:', data);
        this.summary = data;
        this.loading = false;
        this.cdr.detectChanges(); // Forzar actualización de la vista en Angular
      },
      error: (err) => {
        console.error('[DEBUG] AdminDashboardComponent: Error al obtener métricas:', err);
        this.error = `Error al conectar con la API (${err.status || 'Sin conexión'}). Verifique que el backend en puerto 8080 esté corriendo.`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
