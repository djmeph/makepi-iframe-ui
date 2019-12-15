import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class PlansService {

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) {}

    public async plansLatestGet() {
        const response: any = await this.http
        .get(`${this.globalService.uri}/plans/latest`)
        .toPromise();
        return response;
    }
}
