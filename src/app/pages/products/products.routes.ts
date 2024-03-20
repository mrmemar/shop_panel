import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

export const ROUTES: Routes = [
    { path: "", pathMatch: "full", redirectTo: "list" },
    { path: 'list', component: ListComponent },
    { path: 'add', component: AddComponent },
];
