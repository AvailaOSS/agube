import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    private baseUrl = 'http://localhost:8080';
    constructor(private http: HttpClient) {}
    formData: FormData = new FormData();

    upload(file: File): Observable<HttpEvent<any>> {
        this.formData.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/upload`, this.formData, {
            reportProgress: true,
            responseType: 'json',
        });
        console.log(file)
        return this.http.request(req);
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}
