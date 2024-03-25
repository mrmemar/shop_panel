import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router)
    authService.check().subscribe({
        next: (q) => {
            if (q) {
                return true;
            } else {
                authService.logout();
                router.navigate(["login"]);
                return false;
            }
        }, error: () => {
            authService.logout();
            router.navigate(["login"]);
            return false;
        }
    })
    return true;
};
