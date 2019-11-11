import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'config';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';
import { countries } from '../countries';

interface DebitSourceStatus {
  accountHolderName: any;
  routingNumber: any;
  accountNumber: any;
  accountHolderType: any;
  country: any;
  currency: any;
}

@Component({
  selector: 'app-debit-source',
  templateUrl: './debit-source.component.html',
  styleUrls: ['./debit-source.component.scss']
})
export class DebitSourceComponent implements AfterViewInit {

  debitSourceStatus = {} as DebitSourceStatus;

  numericPattern = Validators.pattern('[0-9]*');
  patternHolder = Validators.pattern('(individual|company)');
  patternAlpha = Validators.pattern('[a-zA-Z]*');

  debitSourceForm = new FormGroup({
    accountHolderName: new FormControl(this.debitSourceStatus.accountHolderName, [
      Validators.required,
    ]),
    routingNumber: new FormControl(this.debitSourceStatus.routingNumber, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      this.numericPattern,
    ]),
    accountNumber: new FormControl(this.debitSourceStatus.accountNumber, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(16),
      this.numericPattern,
    ]),
    accountHolderType: new FormControl(this.debitSourceStatus.accountHolderType, [
      Validators.required,
      this.patternHolder
    ]),
    country: new FormControl(this.debitSourceStatus.country, [
      Validators.required,
      Validators.min(2),
      Validators.max(2),
      this.patternAlpha,
    ]),
    currency: new FormControl(this.debitSourceStatus.currency, [
      Validators.required,
      Validators.min(3),
      Validators.max(3),
      this.patternAlpha,
    ]),
  });

  stripe: any;
  countries = countries;
  countryListOpen = false;

  constructor(
    private stripePaymentMethodsService: StripePaymentMethodsService,
  ) {
    this.debitSourceForm.patchValue({
      currency: 'usd',
      accountHolderType: 'individual',
      country: 'US'
    });
  }

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
      result = await this.stripePaymentMethodsService.create(response.token.id);
      window.parent.postMessage(result, '*');
    } catch (err) {
      console.error(err);
    }
  }

}
