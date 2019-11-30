import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';
import { PlansService } from '../plans.service';
import { SubscriptionsService } from '../subscriptions.service';
import { Pages } from '../models/pages';

interface CheckoutStatus {
  stripePaymentMethodId: any;
  planId: any;
  versionNumber: any;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit {

  loading = false;

  pages = Pages;

  checkoutStatus = {} as CheckoutStatus;

  checkoutForm = new FormGroup({
    stripePaymentMethodId: new FormControl(this.checkoutStatus.stripePaymentMethodId, [
      Validators.required,
    ]),
    planId: new FormControl(this.checkoutStatus.planId, [
      Validators.required
    ]),
    versionNumber: new FormControl(this.checkoutStatus.versionNumber, [
      Validators.required
    ]),
  });

  latestPlans = [];

  constructor(
    public stripePaymentMethods: StripePaymentMethodsService,
    private plans: PlansService,
    private subscriptions: SubscriptionsService,
    private router: Router,
  ) {}

  async ngAfterViewInit() {
    this.loading = false;
    try {
      this.stripePaymentMethods.myPaymentMethods = await this.stripePaymentMethods.getAll();
      this.latestPlans = await this.plans.plansLatestGet();
    } catch (err) {
      console.error(err);
    }
  }

  switchTab(view: string) {
    this.router.navigate([view]);
  }

  setPaymentMethod(stripePaymentMethodId: string) {
    if (this.checkoutForm.get('stripePaymentMethodId').value === stripePaymentMethodId) return;
    this.checkoutForm.patchValue({ stripePaymentMethodId });
  }

  setPlan(planId: string, versionNumber: number) {
    if (this.checkoutForm.get('planId').value === planId) return;
    this.checkoutForm.patchValue({ planId });
    this.checkoutForm.patchValue({ versionNumber });
  }

  async checkout() {
    if (this.loading) return;
    this.loading = true;
    const { value: stripePaymentMethodId } = this.checkoutForm.get('stripePaymentMethodId');
    const { value: planId } = this.checkoutForm.get('planId');
    const { value: versionNumber } = this.checkoutForm.get('versionNumber');
    try {
      await this.subscriptions.upsert(stripePaymentMethodId, versionNumber, planId);
      window.parent.postMessage('success', '*');
      this.loading = false;
    } catch (err) {
      console.error(err);
      this.loading = false;
    }
  }
}
