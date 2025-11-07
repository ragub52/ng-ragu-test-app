import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginCredentials, LoginResponse } from '../model/auth.model';
import { BaseApiService } from './base-api.service';
import { InterceptorService } from './interceptor.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService<LoginResponse> {

    /**
     * Valid email id
     */
    private readonly validEmilId: string = 'admin@test.com';

    /**
     * Valid password
     */
    private readonly validPassword: string = 'admin@123';

    /**
     * Constructor
     * @param cookieService - NGX cookie service
     * @param interceptorService - Interceptor service
     */
    constructor(
        private cookieService: CookieService,
        private interceptorService: InterceptorService) {
        super();
    }

    /**
   * Generates a random mock token string
   */
    private generateToken(length = 20): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    /** 
     * Handles login
     */
    login(credentials: LoginCredentials): Observable<LoginResponse> {
        const { email, password } = credentials;

        if (email === this.validEmilId && password === this.validPassword) {
            const response: LoginResponse = {
                auth_token: this.generateToken(32),
                user: { email }
            };

            return this.interceptorService.intercept(this.simulateResponse(response, 1000).pipe(
                tap(res => this.cookieService.set('auth_token', res.auth_token))
            ));
        }

        return this.interceptorService.intercept(this.simulateError('Invalid email or password', 1000));
    }

    /** 
     * Handles logout
     */
    logout() {
        console.log('User logged out');
    }
}
