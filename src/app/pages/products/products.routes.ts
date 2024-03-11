import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { WelcomeComponent } from '../welcome/welcome.component';

export const ROUTES: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'add', component: WelcomeComponent },
];
