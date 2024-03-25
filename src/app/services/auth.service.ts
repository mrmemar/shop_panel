import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly url = "https://api.escuelajs.co/api/v1/auth";
    token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    constructor(private http: HttpClient, private msg: NzMessageService, private router: Router) {
        this.loadToken();
    }

    private setToken(reponse: Response) {
        this.token.next(reponse.access_token)
        localStorage.setItem("token_panel", reponse.access_token);
        localStorage.setItem("refresh_panel", reponse.refresh_token);
    }

    loadToken(): string | null {
        this.token.next(localStorage.getItem("token_panel"));
        return this.token.value;
    }

    clearToken() {
        this.token.next(null)
        localStorage.removeItem("token_panel");
        localStorage.removeItem("refresh_panel");
    }

    login(model: User): Observable<Response> {
        const url = `${this.url}/login`;
        return this.http.post<Response>(url, model).pipe(
            tap(q => {
                if (q.access_token) {
                    this.setToken(q);
                    this.loadToken();
                    this.msg.success("خوش آمدید");
                    this.router.navigate(["panel"]);
                } else {
                    this.msg.error('wrong!')
                }
            }), catchError(err => {
                this.msg.error(err.error.message)
                throw err;
            })
        )
    }

    logout() {
        this.clearToken();
        this.router.navigate(["login"])
    }

    check(): Observable<boolean> {
        const url = `${this.url}/profile`;
        return this.http.get<User>(url).pipe(
            map(q => {
                if (q.id) {
                    return true;
                }
                return false;
            }),
            catchError(err => {
                throw err;
            })
        );
    }

    profile(): Observable<User> {
        const url = `${this.url}/profile`;
        return this.http.get<User>(url);
    }

    refresh(): Observable<Response> {
        const url = `${this.url}/refresh-token`;
        const body = { refreshToken: localStorage.getItem("refresh_panel") }
        return this.http.post<Response>(url, body)
    }
}

interface Response {
    access_token: string;
    refresh_token: string;
}
