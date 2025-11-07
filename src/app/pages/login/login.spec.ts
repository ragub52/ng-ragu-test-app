import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        Login,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    const form = component.loginForm.value;

    expect(form.email).toBe('');
    expect(form.password).toBe('');
  });

  it('should do nothing if form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(snackBarSpy.open).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should login successfully and navigate to dashboard', () => {
    const credentials = { email: 'admin@test.com', password: 'admin@123' };
    const mockResponse = { auth_token: 'mockToken', user: { email: credentials.email } };
    component.loginForm.setValue(credentials);

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(credentials);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Login successful!', 'Close', { duration: 2000 });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error snack bar on login failure', () => {
    const credentials = { email: 'wrong@test.com', password: 'wrong' };
    component.loginForm.setValue(credentials);

    const error = { message: 'Invalid email or password' };
    authServiceSpy.login.and.returnValue(throwError(() => error));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(credentials);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Invalid email or password', 'Close', { duration: 3000 });
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
