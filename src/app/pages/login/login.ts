import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take, catchError, throwError, finalize, EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  /**
   * Login form
   */
  loginForm: FormGroup;

  /**
   * Constructor
   * @param fb - Angular form builder
   * @param authService - Auth service
   * @param snackBar - Material snack bar
   * @param router - Router
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Define login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Handles form submit.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).pipe(
        take(1), // ensures only one emission is handled
        catchError(err => {
          this.snackBar.open(err.message || 'Invalid email or password', 'Close', { duration: 3000 });
          return EMPTY; // Return EMPTY so the stream completes without propagating an error
        })
      )
        .subscribe(response => {
          this.snackBar.open('Login successful!', 'Close', { duration: 2000 });
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
