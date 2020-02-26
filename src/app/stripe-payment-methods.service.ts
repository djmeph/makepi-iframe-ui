import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class StripePaymentMethodsService {

    myPaymentMethods = [];

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) {}

    public create(publicToken): Promise<any> {
        return this.http
        .post(`${this.globalService.uri}/stripe-payment-methods`, { publicToken })
        .toPromise();
    }

    public getAll(): Promise<any> {
        return this.http
        .get(`${this.globalService.uri}/stripe-payment-methods`)
        .toPromise();
    }

    public get(key: string): Promise<any> {
        return this.http
        .get(`${this.globalService.uri}/stripe-payment-methods/${key}`)
        .toPromise();
    }

    public delete(key: string): Promise<any> {
        return this.http
        .delete(`${this.globalService.uri}/stripe-payment-methods/${key}`)
        .toPromise();
    }

    public verify(key: string, amounts: number[]) {
        return this.http
        .post(`${this.globalService.uri}/stripe-payment-method-verify/${key}`, { amounts })
        .toPromise();
    }

}
