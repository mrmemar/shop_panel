import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './gaurd/auth.guard';
import { PanelComponent } from './pages/panel/panel.component';
import { profileResolver } from './resolve/profile.resolver';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: "ورود به پنل" },
    { path: "", redirectTo: "/panel", pathMatch: 'full' },
    {
        path: "panel", component: PanelComponent, canActivate: [authGuard], resolve: { profile: profileResolver }, children: [

            { path: "", loadChildren: () => import('./pages/panel/account/account.routes').then(r => r.ROUTES) },
            { path: "profile", loadChildren: () => import('./pages/panel/account/account.routes').then(r => r.ROUTES) },
            { path: "products", loadChildren: () => import('./pages/panel/products/products.routes').then(r => r.ROUTES) },
            { path: "users", loadChildren: () => import('./pages/panel/users/users.routes').then(r => r.ROUTES) },
            { path: "categories", loadChildren: () => import('./pages/panel/category/categories.routes').then(r => r.ROUTES) },
        ]
    },
    { path: "**", component: NotFoundComponent }

];
