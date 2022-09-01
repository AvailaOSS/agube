// For pruposes of this article I have ommitted a number of stuff in this snippet
// to only the most relevant

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OurService {
    constructor(private http: HttpClient) {}

    // Here,we make our request to the backend API, this observer takes in the backend
    // api url as a parameter and performs a GET request
    getProperties(APIUrl: string): Observable<any> {
        return this.http.get(APIUrl);
    }
}
