import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StripeCreditsService {

  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {}

  public create(publicToken): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: any = await this.http
          .post(`${this.globalService.uri}/stripe-credits`, { publicToken })
          .toPromise();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

}
