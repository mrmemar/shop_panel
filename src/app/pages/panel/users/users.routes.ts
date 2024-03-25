import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const ROUTES: Routes = [
    { path: "", pathMatch: "full", redirectTo: "list" },
    { path: 'list', component: UserListComponent },
    { path: 'add', component: UserFormComponent },
    { path: 'edit/:id', component: UserFormComponent },
];
