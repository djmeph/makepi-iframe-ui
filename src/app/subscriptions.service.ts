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

  public async upsert(planId: string, versionNumber: number, stripePaymentMethodId: string) {
    const response: any = await this.http
      .post(`${this.globalService.uri}/subscriptions`, {
        plan: { planId, versionNumber },
        stripePaymentMethodId
      })
      .toPromise();
    return response;
  }
}
