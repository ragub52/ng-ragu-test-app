import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard that prevents authenticated users from accessing login or signup routes.
 */
@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

    /**
     * @param authService - Auth service
     * @param router - Angular router
     */
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    /**
     * Redirects authenticated users to the dashboard.
     * @returns `true` if unauthenticated, otherwise redirects to `/dashboard`.
     */
    canActivate(): boolean | UrlTree {
        if (this.authService.isAuthenticated()) {
            return this.router.createUrlTree(['/dashboard']);
        }

        return true;
    }
}
