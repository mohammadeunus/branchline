import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Always allow access for development
    return of(true);
    
    // Original code commented out for development
    // return this.authService.isAuthenticated$.pipe(
    //   take(1),
    //   map(isAuthenticated => {
    //     if (!isAuthenticated) {
    //       this.router.navigate(['/auth/login']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  }
}