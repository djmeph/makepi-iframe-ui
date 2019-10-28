import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'config';
import { StripeCreditsService } from '../stripe-credits.service';

@Component({
  selector: 'app-credit-source',
  templateUrl: './credit-source.component.html',
  styleUrls: ['./credit-source.component.scss']
})
export class CreditSourceComponent implements AfterViewInit {

  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardHandler = this.onChange.bind(this);
  stripeToken: any;
  stripeCardNumberError: any;
  stripeCardExpiryError: any;
  stripeCardCvcError: any;
  stripe: any;

  creditSourceForm = new FormGroup({
    cardHolderName: new FormControl()
  });

  constructor(
    private cd: ChangeDetectorRef,
    private stripeCreditsService: StripeCreditsService
  ) { }

  ngAfterViewInit() {
    this.stripe = Stripe(environment.STRIPE_PUB_KEY);
    const elements = this.stripe.elements();
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount('#card-number');
    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount('#card-expiry');
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount('#card-cvc');
    this.cardNumber.addEventListener('change', this.cardHandler);
    this.cardExpiry.addEventListener('change', this.cardHandler);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  onChange(error) {
    this.stripeCardNumberError = (error.error && error.elementType === 'cardNumber') ? error.error.message : null;
    this.stripeCardExpiryError = (error.error && error.elementType === 'cardExpiry') ? error.error.message : null;
    this.stripeCardCvcError = (error.error && error.elementType === 'cardCvc') ? error.error.message : null;
    this.cd.detectChanges();
  }

  async getToken() {
    const cardHolderName = this.creditSourceForm.get('cardHolderName').value;
    let response;
    let result;
    try {
      response = await this.stripe.createToken(this.cardNumber, { name: cardHolderName });
      result = await this.stripeCreditsService.create(response.token.id);
      window.parent.postMessage(result, '*');
    } catch (err) {
      console.error(err);
    }
  }

}
