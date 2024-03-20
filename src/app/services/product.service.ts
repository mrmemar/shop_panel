import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Product } from '../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly url = "https://yofakestoreapi.onrender.com/api/products"
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    getList(page: number = 1, size: number = 10): Observable<Response> {
        const url = `${this.url}?limit=${size}&page=${(page - 1) * size}`;
        return this.http.get<Response>(url);
    }

    get(id: string): Observable<Product> {
        const url = `${this.url}/${id}`;
        return this.http.get<Product>(url)
    }

    search(query: string) {
        const url = `${this.url}?keyword=${query}`
        return this.http.get<Response>(url);
    }

    add() {
        const url = `${this.url}`;
        const body = {
            "data": {
                title: "test",
                slug: "",
                description: "",
                quantity: 12,
                sold: 0,
                price: 27.78,
                priceAfterDiscount: 16.99,
                colors: [],
                imageCover: "",
                images: [],
                category: "",
                subcategories: [],
                ratingsQuantity: 0,
                _id: "",
                createdAt: "",
                updatedAt: "",
                __v: 0,
                id: ""
            }
        };
        return this.http.post(url, body).pipe(
            catchError(err => {
                this.toastr.error(err.error.message)
                throw err;
            })
        );
    }
}

interface Response {
    results: number;
    paginationResult: {
        currentPage: number,
        limit: number,
        numberOfPages: number
    },
    data: Product[];
}
