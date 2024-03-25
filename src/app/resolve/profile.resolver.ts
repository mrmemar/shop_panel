import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

export const profileResolver: ResolveFn<User> = (route, state) => {
    const authService = inject(AuthService);
    return authService.profile();
};
