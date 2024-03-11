import { Routes } from '@angular/router';
import { ListComponent } from './pages/products/list/list.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/welcome' },
    // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
    { path: "products", loadChildren: () => import('./pages/products/products.routes').then(r => r.ROUTES) }


];
