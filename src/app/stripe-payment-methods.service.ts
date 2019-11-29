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

  public getAll(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const reponse: any = await this.http
          .get(`${this.globalService.uri}/stripe-payment-methods`)
          .toPromise();
        resolve(reponse);
      } catch (err) {
        reject(err);
      }
    });
  }

}
