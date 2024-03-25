import { Routes } from '@angular/router';
import { LoguotComponent } from './loguot/loguot.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
    { path: "", component: ProfileComponent },
    { path: 'loguot', component: LoguotComponent },
];
