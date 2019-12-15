import { Injectable } from '@angular/core';
import { environment } from 'config';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    uri = environment.API_URI;
    jsonHeaders: any;

    constructor() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.jsonHeaders = { headers };
    }
}
