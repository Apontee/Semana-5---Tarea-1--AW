import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.obtenerToken();

    let headers = req.headers;
    if (token) {
        headers = headers.set('X-XSRF-TOKEN', token);
    }

    const clonedReq = req.clone({
        withCredentials: true,
        headers: headers
    });

    return next(clonedReq);
};
