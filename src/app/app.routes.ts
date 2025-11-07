import { Routes, CanActivate } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.gaurd';
import { NoAuthGuard } from './core/guards/no-auth.gaurd';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [NoAuthGuard] },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    {
        path: 'list',
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule),
        canActivate: [AuthGuard]
    }

];
