import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'config';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';

@Component({
  selector: 'app-debit-source',
  templateUrl: './debit-source.component.html',
  styleUrls: ['./debit-source.component.scss']
})
export class DebitSourceComponent implements AfterViewInit {

  debitSourceForm = new FormGroup({
    routingNumber: new FormControl(),
    accountNumber: new FormControl(),
    accountHolderName: new FormControl(),
    accountHolderType: new FormControl(),
    country: new FormControl(),
    currency: new FormControl(),
  });

  stripe: any;

  constructor(
    private stripePaymentMethodsService: StripePaymentMethodsService
  ) { }

  ngAfterViewInit() {
    this.stripe = Stripe(environment.STRIPE_PUB_KEY);
  }

  async getToken() {
    const routingNumber = this.debitSourceForm.get('routingNumber').value;
    const accountNumber = this.debitSourceForm.get('accountNumber').value;
    const accountHolderName = this.debitSourceForm.get('accountHolderName').value;
    const accountHolderType = this.debitSourceForm.get('accountHolderType').value;
    const country = this.debitSourceForm.get('country').value;
    const currency = this.debitSourceForm.get('currency').value;
    let response;
    let result;
    try {
      response = await this.stripe.createToken('bank_account', {
        routing_number: routingNumber,
        account_number: accountNumber,
        account_holder_name: accountHolderName,
        account_holder_type: accountHolderType,
        country,
        currency
      });
      console.log(response.token.id)
      result = await this.stripePaymentMethodsService.create(response.token.id);
      window.parent.postMessage(result, '*');
    } catch (err) {
      console.error(err);
    }
  }

}
