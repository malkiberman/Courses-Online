import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    const token = localStorage.getItem('token'); // קבלת הטוקן מה-localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  joinCourse(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/join`, {}, { headers });
  }

  leaveCourse(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/leave`, { headers });
  }
  getMyCourses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/my-courses`, { headers });
  }
  
  getCourseDetails(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}`, { headers });
  }
  
  getLessons(courseId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/lessons`, { headers });
  }
  addCourse(course: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, course, { headers });
  }
  
  updateCourse(courseId: number, course: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}`, course, { headers });
  }
  
  deleteCourse(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}`, { headers });
  }
  
  addLesson(courseId: number, lesson: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/lessons`, lesson, { headers });
  }
  
  updateLesson(courseId: number, lessonId: number, lesson: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/lessons/${lessonId}`, lesson, { headers });
  }
  
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`<span class="math-inline">\{this\.baseUrl\}/</span>{courseId}/lessons/${lessonId}`, { headers });
  }
}
