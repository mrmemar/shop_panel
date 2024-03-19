import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './gaurd/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', pathMatch: 'full', redirectTo: '/products' },
    { path: "products", canActivate: [authGuard], loadChildren: () => import('./pages/products/products.routes').then(r => r.ROUTES) },
    { path: "users", canActivate: [authGuard], loadChildren: () => import('./pages/users/users.routes').then(r => r.ROUTES) }


];
