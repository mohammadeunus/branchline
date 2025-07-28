import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Always allow access for development
    return of(true);
    
    // Original code commented out for development
    // const requiredRoles = route.data['roles'] as string[];
    
    // return this.authService.currentUser$.pipe(
    //   take(1),
    //   map(user => {
    //     if (!user) {
    //       this.router.navigate(['/auth/login']);
    //       return false;
    //     }

    //     if (requiredRoles && !requiredRoles.includes(user.role)) {
    //       this.router.navigate(['/dashboard']);
    //       return false;
    //     }

    //     return true;
    //   })
    // );
  }
}