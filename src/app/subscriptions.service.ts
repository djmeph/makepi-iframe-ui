import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionsService {

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) {}

    public upsert(stripePaymentMethodId: string, planId: string, versionNumber: number, paymentDay: number) {
        return this.http
        .post(`${this.globalService.uri}/subscriptions`, {
            plan: { planId, versionNumber },
            stripePaymentMethodId,
            paymentDay
        })
        .toPromise();
    }

    public getLatest() {
        return this.http
        .get(`${this.globalService.uri}/subscriptions/latest`)
        .toPromise();
    }
}
