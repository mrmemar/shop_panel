import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly url = "https://api.escuelajs.co/api/v1/products";

    constructor(private http: HttpClient, private msg: NzMessageService) { }

    list(page: number = 1, size: number = 10): Observable<Product[]> {
        const url = `${this.url}?offset=${(page - 1) * size}&limit=${size}`;
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


}
