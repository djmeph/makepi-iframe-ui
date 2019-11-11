import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentMethodsService {

  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {}

  public create(publicToken): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: any = await this.http
          .post(`${this.globalService.uri}/stripe-payment-methods`, { publicToken })
          .toPromise();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

}
