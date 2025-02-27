import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getCourseDetails(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${courseId}`, { headers });
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
    return this.http.put(`${this.baseUrl}/${courseId}`, course, { headers });
  }

  deleteCourse(courseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/${courseId}`, { headers });
  }

  getLessons(courseId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/lessons`, { headers });
  }

  addLesson(courseId: number, lesson: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, lesson, { headers });
  }

  updateLesson(courseId: number, lessonId: number, lesson: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  leaveCourse(url: string, headers: any): Observable<any> {
    return this.http.delete(url, { headers });
  }
}