import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly url = "https://api.escuelajs.co/api/v1/products";

    constructor(
        private http: HttpClient,
        private msg: NzMessageService,
        private route: ActivatedRoute
    ) { }

    list(): Observable<Product[]> {
        const pageIndex = this.route.snapshot.queryParams['page'] ?? 1;
        const pageSize = this.route.snapshot.queryParams['size'] ?? 10;
        let search = this.route.snapshot.queryParams['search'] ?? '';
        search = search.replaceAll(":", "=").replaceAll(",", "&").replace(/[{}"]/g, "")
        const url = `${this.url}?offset=${(pageIndex - 1) * pageSize}&limit=${pageSize}&${search}`;
        return this.http.get<Product[]>(url).pipe(
            map(q => {
                q.forEach(item => {
                    item.images = item.images.toString().replace(/[~^"[\]&]/g, "").split(",");
                    item.categoryId = item.category.id;
                })
                return q;
            })
        )
    }

    get(id: number): Observable<Product> {
        const url = `${this.url}/${id}`;
        return this.http.get<Product>(url).pipe(
            map(q => {
                q.images = q.images.toString().replace(/[~^"[\]&]/g, "").split(",");
                q.categoryId = q.category.id;
                return q;
            })
        )
    }

    add(model: Product): Observable<Product> {
        console.log(model)
        const url = `${this.url}`;
        return this.http.post<Product>(url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ایجاد گردید");
                }
            }),
            catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        );
    }

    update(id: number, model: Product): Observable<Product> {
        const url = `${this.url}/${id}`;
        return this.http.put<Product>(url, model).pipe(
            tap(q => {
                if (q.id) {
                    this.msg.success("با موفقیت ویرایش گردید");
                }
            }),
            catchError(err => {
                err.error.message.forEach((error: string) => {
                    this.msg.error(error)
                })
                throw err;
            })
        );
    }

    remove(id: number) {
        const url = `${this.url}/${id}`;
        return this.http.delete(url).pipe(tap(() => this.msg.success("با موفقیت حذف شد !")));
    }

    search(key: string, value: string) {
        const url = `${this.url}/?${key}=${value}`;
        return this.http.get(url)
    }
}
