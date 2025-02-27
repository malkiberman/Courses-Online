import { Routes, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';

const adminOrTeacherGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole();
  if (role === 'admin' || role === 'teacher') {
    return true;
  }
  return router.parseUrl('/home');
};

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'manage-courses', component: ManageCoursesComponent, canActivate: [adminOrTeacherGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];