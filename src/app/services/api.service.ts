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

  // Mercado Pago Payment
  createCheckoutPreference(installmentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/checkout-preference`, { installmentId }, { headers: this.getHeaders() });
  }

  confirmSimulatedPayment(installmentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/confirm-simulated?installmentId=${installmentId}`, {}, { headers: this.getHeaders() });
  }
}
