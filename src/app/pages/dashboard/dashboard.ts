import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="dashboard-container">
      <h2>Welcome, {{ userEmail }}</h2>

      <button mat-stroked-button color="primary" routerLink="/list">
        Go to List Page
      </button>

      <button mat-flat-button color="warn" (click)="logout()">
        Logout
      </button>
    </div>
  `,
  styles: [`
    .dashboard-container {
      text-align: center;
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }
  `]
})
export class Dashboard {
  /**
   *  Logged-in user's email
   */
  userEmail!: string;

  /**
   * Initializes the DashboardComponent.
   * 
   * @param authService - Auth service
   * @param router - Angular router
   */
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  /**
   * Logs out the current user and redirects to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
