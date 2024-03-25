import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = "https://api.escuelajs.co/api/v1/users";

    constructor(private http: HttpClient, private msg: NzMessageService) { }

    list(): Observable<User[]> {
        const url = this.url;
        return this.http.get<User[]>(url)
    }

    get(id: number): Observable<User> {
        const url = `${this.url}/${id}`;
        return this.http.get<User>(url).pipe(map(q => {
            q.image = q.avatar
            return q;
        }));
    }

    add(model: User): Observable<User> {
        const url = `${this.url}`;
        model.avatar = model.image;
        return this.http.post<User>(url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ذخیره شد.");
                }
            }), catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        );
    }

    update(id: number, model: User): Observable<User> {
        const url = `${this.url}/${id}`;
        model.avatar = model.image;
        return this.http.put<User>(url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ویرایش شد.");
                }
            }), catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        );
    }

    // remove(id:number) {
    //     const url = `${this.url}/${id}`;
    //     return this.http.put<User>(url, model);
    // }

    check(email: string): Observable<boolean> {
        const url = `${this.url}/is-available`;
        const body = { email };
        return this.http.post<{ isAvailable: boolean }>(url, body).pipe(map(q => q.isAvailable));
    }
}


