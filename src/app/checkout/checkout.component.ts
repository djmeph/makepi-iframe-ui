import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';
import { PlansService } from '../plans.service';
import { SubscriptionsService } from '../subscriptions.service';
import { Pages } from '../models/pages';
import * as _ from 'lodash';

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
    initializing = false;

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
    membership: any;

    constructor(
        public stripePaymentMethods: StripePaymentMethodsService,
        private plans: PlansService,
        private subscriptionsService: SubscriptionsService,
        private router: Router,
    ) {}

    async ngAfterViewInit() {
        this.loading = false;
        this.initializing = true;
        try {
            this.membership = await this.subscriptionsService.getLatest();
            this.stripePaymentMethods.myPaymentMethods = await this.stripePaymentMethods.getAll();
            this.latestPlans = await this.plans.plansLatestGet() as any;
            if (this.membership) {
                const [selectedPaymentMethod] = _.filter(this.stripePaymentMethods.myPaymentMethods, { stripePaymentMethodId: this.membership.stripePaymentMethodId });
                if (selectedPaymentMethod) {
                    this.checkoutForm.patchValue({ stripePaymentMethodId: selectedPaymentMethod.stripePaymentMethodId });
                }
                const [selectedPlan] = _.filter(this.latestPlans, { planId: this.membership.plan.planId, versionNumber: this.membership.plan.versionNumber  });
                if (selectedPlan) {
                    this.checkoutForm.patchValue({ planId: selectedPlan.planId });
                    this.checkoutForm.patchValue({ versionNumber: selectedPlan.versionNumber });
                }
            }
            this.initializing = false;
        } catch (err) {
            console.error(err);
            this.initializing = false;
        }
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

    setPaymentMethod(stripePaymentMethodId: string) {
        if (this.checkoutForm.get('stripePaymentMethodId').value === stripePaymentMethodId) { return; }
        this.checkoutForm.patchValue({ stripePaymentMethodId });
    }

    setPlan(planId: string, versionNumber: number) {
        if (this.checkoutForm.get('planId').value === planId) { return; }
        this.checkoutForm.patchValue({ planId });
        this.checkoutForm.patchValue({ versionNumber });
    }

    async checkout() {
        if (this.loading) { return; }
        this.loading = true;
        const { value: stripePaymentMethodId } = this.checkoutForm.get('stripePaymentMethodId');
        const { value: planId } = this.checkoutForm.get('planId');
        const { value: versionNumber } = this.checkoutForm.get('versionNumber');
        try {
            await this.subscriptionsService.upsert(stripePaymentMethodId, planId, versionNumber);
            this.router.navigate(['/membership-info']);
            this.loading = false;
        } catch (err) {
            console.error(err);
            this.loading = false;
        }
    }
}
