import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    readonly url = "https://api.escuelajs.co/api/v1/categories";
    constructor(private http: HttpClient, private msg: NzMessageService) { }

    list(): Observable<Category[]> {
        const url = `${this.url}`;
        return this.http.get<Category[]>(url)
    }

    get(categoryId: number): Observable<Category> {
        const url = `${this.url}/${categoryId}`;
        return this.http.get<Category>(url);
    }

    add(model: Category): Observable<Category> {
        return this.http.post<Category>(this.url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ایجاد شد !")
                }
            }), catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        )
    }

    update(categoryId: number, model: Category): Observable<Category> {
        const url = `${this.url}/${categoryId}`;
        return this.http.put<Category>(url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ویرایش شد !")
                }
            }), catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        );
    }

    remove(categoryId: number) {
        const url = `${this.url}/${categoryId}`;
        return this.http.delete(url).pipe(tap(q =>
            this.msg.success("با موفقیت حذف شد !")
        ));
    }


}
