import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/users`;
  
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.checkAuth();
  }

  private checkAuth() {
    const token = this.getToken();
    if (token) {
      this.loadCurrentUser();
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        this.setToken(response.token);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        this.setToken(response.token);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  loadCurrentUser() {
    this.http.get<User>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      },
      error: () => {
        this.logout();
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
