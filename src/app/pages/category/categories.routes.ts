import { Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

export const ROUTES: Routes = [
    { path: "", pathMatch: "full", redirectTo: "list" },
    { path: 'list', component: CategoryListComponent },
    { path: 'add', component: CategoryFormComponent },
    { path: 'edit/:id', component: CategoryFormComponent },
];
