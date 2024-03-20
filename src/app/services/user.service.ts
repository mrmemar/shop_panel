import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = "https://yofakestoreapi.onrender.com/api/users"
    constructor(private http: HttpClient) { }

    list(): Observable<Response> {
        const url = this.url;
        return this.http.get<Response>(url)
    }
}

interface Response {
    results: number;
    data: User[],
    paginationResult: {
        currentPage: number
        limit: number
        numberOfPages: number
    }
}
