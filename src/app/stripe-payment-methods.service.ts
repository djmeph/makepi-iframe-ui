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

  public async create(publicToken): Promise<any> {
    const response: any = await this.http
      .post(`${this.globalService.uri}/stripe-payment-methods`, { publicToken })
      .toPromise();
    return response;
  }

  public async getAll(): Promise<any> {
    const reponse: any = await this.http
      .get(`${this.globalService.uri}/stripe-payment-methods`)
      .toPromise();
    return reponse;
  }

}
