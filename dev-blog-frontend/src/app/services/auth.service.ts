import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:5000/api/auth';

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, payload);
  }

  signup(payload: SignupPayload): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, payload);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
