import { Component, AfterViewInit, OnInit } from '@angular/core';
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
    paymentDay: any;
}

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnInit {

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
        paymentDay: new FormControl(this.checkoutStatus.paymentDay, [
            Validators.required,
            Validators.min(1),
            Validators.max(28)
        ])
    });

    latestPlans = [];
    membership: any;

    constructor(
        public stripePaymentMethods: StripePaymentMethodsService,
        private plans: PlansService,
        private subscriptionsService: SubscriptionsService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loading = false;
        this.initializing = true;
    }

    async ngAfterViewInit() {
        this.loading = false;
        this.initializing = true;

        try {
            this.membership = await this.subscriptionsService.getLatest();
        } catch (err) {
            console.error(err);
        }

        try {
            this.stripePaymentMethods.myPaymentMethods = await this.stripePaymentMethods.getAll();
        } catch (err) {
            console.error(err);
        }

        try {
            this.latestPlans = await this.plans.plansLatestGet() as any;
            this.initializing = false;
        } catch (err) {
            console.error(err);
            this.initializing = false;
        }

        if (this.membership) {
            if (this.membership.stripePaymentMethodId === 'cash') {
                this.checkoutForm.patchValue({ stripePaymentMethodId: 'cash' });
            } else {
                const [selectedPaymentMethod] = _.filter(this.stripePaymentMethods.myPaymentMethods, {
                    stripePaymentMethodId: this.membership.stripePaymentMethodId
                });
                if (selectedPaymentMethod) {
                    this.checkoutForm.patchValue({ stripePaymentMethodId: selectedPaymentMethod.stripePaymentMethodId });
                }
            }
            const [selectedPlan] = _.filter(this.latestPlans, {
                planId: this.membership.plan.planId, versionNumber: this.membership.plan.versionNumber
            });
            if (selectedPlan) {
                this.checkoutForm.patchValue({ planId: selectedPlan.planId });
                this.checkoutForm.patchValue({ versionNumber: selectedPlan.versionNumber });
            }
            if (this.membership.paymentDay) {
                this.checkoutForm.patchValue({ paymentDay: this.membership.paymentDay });
            }
        } else {
            this.checkoutForm.patchValue({ paymentDay: 1 });
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
        const { value: paymentDay } = this.checkoutForm.get('paymentDay');
        try {
            await this.subscriptionsService.upsert(stripePaymentMethodId, planId, versionNumber, paymentDay);
            this.router.navigate(['/membership-info']);
            this.loading = false;
        } catch (err) {
            console.error(err);
            this.loading = false;
        }
    }
}
