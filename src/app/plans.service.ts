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

    public plansLatestGet() {
        return this.http
        .get(`${this.globalService.uri}/plans/latest`)
        .toPromise();
    }

    public getPlan(planId: string, versionNumber: number) {
        return this.http
        .get(`${this.globalService.uri}/plans/${planId}/${versionNumber}`)
        .toPromise();
    }
}
