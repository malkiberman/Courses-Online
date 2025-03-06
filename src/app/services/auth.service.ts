import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId'); // הוספת מחיקת userId
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => this.saveUser(user)) // שימוש ב-tap לשמירת המשתמש
    );
  }


  saveUser(user: User): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', String(user.userId));
    localStorage.setItem('role', user.role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const parsedUserId = parseInt(userId, 10);
      if (!isNaN(parsedUserId)) {
        return parsedUserId;
      } else {
        console.error('Invalid userId in LocalStorage:', userId);
        return null;
      }
    }
    return null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }
}
