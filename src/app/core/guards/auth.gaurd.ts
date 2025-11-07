import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    /**
     * Constructor
     * @param authService - Auth service
     * @param router - Angular Router
     */
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    /**
     * Determines if a route can be activated
     * 
     * @returns `true` if authenticated, otherwise redirects to `/login`.
     */
    canActivate(): boolean | UrlTree {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }
}
