import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const ROUTES: Routes = [
    { path: "", pathMatch: "full", redirectTo: "list" },
    { path: 'list', component: ProductListComponent },
    { path: 'add', component: ProductFormComponent },
    { path: 'edit/:id', component: ProductFormComponent },
];
