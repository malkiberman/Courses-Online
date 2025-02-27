import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses'; // עדכן את כתובת ה-API שלך

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    console.log('Fetching courses...');
    console.log('API URL:', this.apiUrl);
  
    return this.http.get<any[]>(this.apiUrl);
  }

  joinCourse(courseId: number): Observable<any> {
    return this.http.post(`<span class="math-inline">\{this\.apiUrl\}/</span>{courseId}/join`, {});
  }

  leaveCourse(courseId: number): Observable<any> {
    return this.http.delete(`<span class="math-inline">\{this\.apiUrl\}/</span>{courseId}/leave`);
  }
}