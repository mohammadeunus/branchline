import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  // Mock user for development
  private mockUser: User = {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://via.placeholder.com/40'
  };

  private currentUserSubject = new BehaviorSubject<User | null>(this.mockUser);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  initializeAuth(): void {
    // Always set as authenticated for development
    this.setCurrentUser(this.mockUser);
  }

  login(email: string, password: string): Observable<any> {
    // Mock successful login
    return of({ user: this.mockUser, token: 'mock-token' });
  }

  logout(): void {
    // For development, just navigate to dashboard instead of login
    this.router.navigate(['/dashboard']);
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.mockUser;
  }

  isAuthenticated(): boolean {
    return true; // Always return true for development
  }

  private validateToken(token: string): void {
    // Mock token validation - always succeed
    this.setCurrentUser(this.mockUser);
  }
}