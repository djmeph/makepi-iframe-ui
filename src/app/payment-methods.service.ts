import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodsService {

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) { }

    public get(itemKey: string): Promise<any> {
        const [schema, key] = itemKey.split('#');
        return this.http
        .get(`${this.globalService.uri}/${schema}/${key}`)
        .toPromise();
    }
}
