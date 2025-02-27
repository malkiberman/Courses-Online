import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'manage-courses', component: ManageCoursesComponent },

  { path: '**', redirectTo: '/home' }
];