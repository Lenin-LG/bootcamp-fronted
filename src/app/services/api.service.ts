import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Admin Endpoints
  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard`, { headers: this.getHeaders() });
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/students`, { headers: this.getHeaders() });
  }

  getStudentDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/students/${id}`, { headers: this.getHeaders() });
  }

  updateApprovalStatus(userId: number, approvalStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${userId}/approval`, { approvalStatus }, { headers: this.getHeaders() });
  }

  updateContractStatus(profileId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/students/${profileId}/contract`, data, { headers: this.getHeaders() });
  }

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/payments`, { headers: this.getHeaders() });
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/config`, { headers: this.getHeaders() });
  }

  updateConfig(configData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/config`, configData, { headers: this.getHeaders() });
  }

  // Admin Class Management Endpoints
  getAdminClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/classes`, { headers: this.getHeaders() });
  }

  createOrUpdateClass(classData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/classes`, classData, { headers: this.getHeaders() });
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/classes/${id}`, { headers: this.getHeaders() });
  }

  // Student Endpoints
  getStudentDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/dashboard`, { headers: this.getHeaders() });
  }

  getStudentInstallments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/installments`, { headers: this.getHeaders() });
  }

  submitEmploymentReport(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/employment-reports`, data, { headers: this.getHeaders() });
  }

  getStudentEmploymentReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/employment-reports`, { headers: this.getHeaders() });
  }

  updateStudentProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/student/profile`, data, { headers: this.getHeaders() });
  }

  getCourseProgress(): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/progress`, { headers: this.getHeaders() });
  }

  submitTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/tasks/submit`, data, { headers: this.getHeaders() });
  }

  addPaymentMethod(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/payment-methods`, data, { headers: this.getHeaders() });
  }

  // Mercado Pago Official Payment
  createCheckoutPreference(installmentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/checkout-preference`, { installmentId }, { headers: this.getHeaders() });
  }

  // Document Download URL generator
  getDocumentDownloadUrl(filename: string): string {
    return `${this.baseUrl}/documents/download?file=${encodeURIComponent(filename)}`;
  }

  // Upload document / CV to S3
  uploadDocument(file: File, subfolder: string = 'cvs'): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subfolder', subfolder);

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.post<{ fileUrl: string }>(`${this.baseUrl}/documents/upload`, formData, { headers });
  }
}
