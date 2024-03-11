import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly url = "https://dummyjson.com"
    constructor(private http: HttpClient) { }


    getList(page: number = 1, size: number = 10): Observable<Response> {
        const url = `${this.url}/products?limit=${size}&skip=${(page - 1) * size}`;
        return this.http.get<Response>(url);
    }

    search(query: string) {
        const url = `${this.url}/products/search?q=${query}`
        return this.http.get<Response>(url);
    }
}

interface Response{
    products: Product[];
    limit: number;
    skip: number;
    total: number;
}
