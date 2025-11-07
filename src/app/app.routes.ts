import { Routes, CanActivate } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.gaurd';
import { NoAuthGuard } from './guards/noauth.gaurd';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [NoAuthGuard] },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] }
];
