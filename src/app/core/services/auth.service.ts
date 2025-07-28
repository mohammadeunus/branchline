import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  initializeAuth(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.validateToken(token);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.post('/auth/login', { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private validateToken(token: string): void {
    // Implement token validation logic
    this.apiService.get('/auth/validate').subscribe({
      next: (user) => {
        this.setCurrentUser(user);
      },
      error: () => {
        this.logout();
      }
    });
  }
}