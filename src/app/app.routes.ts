import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminStudentsComponent } from './pages/admin/admin-students/admin-students';
import { AdminPaymentsComponent } from './pages/admin/admin-payments/admin-payments';
import { AdminConfigComponent } from './pages/admin/admin-config/admin-config';
import { AdminClassesComponent } from './pages/admin/admin-classes/admin-classes';
import { StudentLayoutComponent } from './pages/student/student-layout/student-layout';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard';
import { StudentPaymentsComponent } from './pages/student/student-payments/student-payments';
import { StudentEmploymentComponent } from './pages/student/student-employment/student-employment';
import { StudentProfileComponent } from './pages/student/student-profile/student-profile';
import { StudentProgressComponent } from './pages/student/student-progress/student-progress';
import { authGuard, adminGuard } from './guards/auth.guard';
import { LandingComponent } from './pages/landing/landing';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'postular', component: RegisterComponent },

  // Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'alumnos', component: AdminStudentsComponent },
      { path: 'clases', component: AdminClassesComponent },
      { path: 'pagos', component: AdminPaymentsComponent },
      { path: 'configuracion', component: AdminConfigComponent }
    ]
  },

  // Student Routes
  {
    path: 'alumno',
    component: StudentLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: StudentDashboardComponent },
      { path: 'mi-progreso', component: StudentProgressComponent },
      { path: 'mis-pagos', component: StudentPaymentsComponent },
      { path: 'mi-empleo', component: StudentEmploymentComponent },
      { path: 'mi-perfil', component: StudentProfileComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
