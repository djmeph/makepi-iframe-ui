import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';
import { Pages } from '../models/pages';

interface CheckoutStatus {
  stripePaymentMethodId: any;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit {

  pages = Pages;

  checkoutStatus = {} as CheckoutStatus;

  checkoutForm = new FormGroup({
    stripePaymentMethodId: new FormControl(this.checkoutStatus.stripePaymentMethodId, [
      Validators.required,
    ])
  });

  constructor(
    public stripePaymentMethods: StripePaymentMethodsService,
    private router: Router,
  ) {}

  async ngAfterViewInit() {
    try {
      this.stripePaymentMethods.myPaymentMethods = await this.stripePaymentMethods.getAll();
      console.log(this.stripePaymentMethods.myPaymentMethods)
    } catch (err) {
      console.error(err);
    }
  }

  switchTab(view: string) {
    this.router.navigate([view]);
  }

  setPaymentMethod(stripePaymentMethodId: string) {
    console.log(stripePaymentMethodId)
    if (this.checkoutForm.get('stripePaymentMethodId').value === stripePaymentMethodId) {
      return this.checkoutForm.patchValue({ stripePaymentMethodId: null })
    }
    this.checkoutForm.patchValue({
      stripePaymentMethodId
    });
  }
1
  async checkout() {}

}
