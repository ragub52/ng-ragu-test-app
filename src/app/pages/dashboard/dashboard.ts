import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  /**
   * Initializes the DashboardComponent.
   * 
   * @param authService - Auth service
   * @param router - Angular router
   */
  constructor(
    public authService: AuthService,
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
