import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly url = "https://yofakestoreapi.onrender.com/api/auth";
    token: string | null;
    constructor(private http: HttpClient, private toastr: ToastrService) {
        this.token = localStorage.getItem("token_panel");
    }

    isLogin(): boolean {
        if (this.token)
            return true;
        return false;
    }

    register(model: {
        name: string,
        email: string,
        password: string,
        passwordConfirm: string
    }): Observable<Response> {
        const url = `${this.url}/signup`;
        const body = {
            name: model.name,
            email: model.email,
            password: model.password,
            passwordConfirm: model.passwordConfirm
        };
        return this.http.post<Response>(url, body)
    }

    login(email: string, password: string) {
        const url = `${this.url}/login`;
        const body = {
            email,
            password
        };
        return this.http.post<Response>(url, body).pipe(
            tap(q => {
                this.token = q.token;
                localStorage.setItem("token_panel", this.token);
            }), catchError(err => {
                this.toastr.error(err.error.message)
                throw err;
            })
        )
    }
}

interface Response {
    data: User;
    token: string;
}
