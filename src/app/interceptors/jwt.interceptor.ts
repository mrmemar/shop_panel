import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${auth.token}`)
    })
    return next(req);
};
