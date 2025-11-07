import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from '../../core/services/interceptor.service';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginCredentials, LoginResponse } from '../../model/auth.model';

describe('AuthService', () => {
    let service: AuthService;
    let cookieServiceSpy: jasmine.SpyObj<CookieService>;
    let interceptorServiceSpy: jasmine.SpyObj<InterceptorService>;

    beforeEach(() => {
        cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get', 'set', 'delete']);
        interceptorServiceSpy = jasmine.createSpyObj('InterceptorService', ['intercept']);

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: CookieService, useValue: cookieServiceSpy },
                { provide: InterceptorService, useValue: interceptorServiceSpy },
            ],
        });

        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('login', () => {
        it('should login successfully with valid credentials', (done) => {
            const credentials: LoginCredentials = { email: 'admin@test.com', password: 'admin@123' };
            const mockResponse: LoginResponse = { auth_token: 'mockToken', user: { email: credentials.email } };

            // Mock interceptor to just return the observable
            interceptorServiceSpy.intercept.and.callFake((obs: any) => obs);

            // Override generateToken for consistent test
            spyOn<any>(service, 'generateToken').and.returnValue('mockToken');

            service.login(credentials).pipe(take(1)).subscribe(res => {
                expect(res).toEqual(mockResponse);
                expect(service.userEmail()).toBe(credentials.email);
                expect(localStorage.getItem('user_email')).toBe(credentials.email);
                expect(cookieServiceSpy.set).toHaveBeenCalledWith('auth_token', 'mockToken');
                done();
            });
        });

        it('should fail login with invalid credentials', (done) => {
            const credentials: LoginCredentials = { email: 'wrong@test.com', password: 'wrong' };

            interceptorServiceSpy.intercept.and.callFake((obs: any) => obs);

            service.login(credentials).pipe(take(1)).subscribe({
                next: () => { },
                error: (err: Error) => {
                    expect(err.message).toBe('Invalid email or password');
                    expect(service.userEmail()).toBeNull();
                    expect(localStorage.getItem('user_email')).toBeNull();
                    expect(cookieServiceSpy.set).not.toHaveBeenCalled();
                    done();
                }
            });
        });
    });

    describe('isAuthenticated', () => {
        it('should return true if auth token exists', () => {
            cookieServiceSpy.get.and.returnValue('token');
            expect(service.isAuthenticated()).toBeTrue();
        });

        it('should return false if auth token does not exist', () => {
            cookieServiceSpy.get.and.returnValue('');
            expect(service.isAuthenticated()).toBeFalse();
        });
    });

    describe('logout', () => {
        it('should clear userEmail, localStorage and cookie', () => {
            service.userEmail.set('admin@test.com');
            localStorage.setItem('user_email', 'admin@test.com');

            service.logout();

            expect(service.userEmail()).toBeNull();
            expect(localStorage.getItem('user_email')).toBeNull();
            expect(cookieServiceSpy.delete).toHaveBeenCalledWith('auth_token');
        });
    });
});
