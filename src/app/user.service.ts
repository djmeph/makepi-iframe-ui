import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    jwtToken: any;

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) { }

    public cancelSubscription() {
        return this.http
            .delete(`${this.globalService.uri}/subscriptions/latest`)
            .toPromise();
    }
}
