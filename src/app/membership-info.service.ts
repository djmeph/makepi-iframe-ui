import { Injectable } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';
import { PlansService } from './plans.service';
import { StripePaymentMethodsService } from './stripe-payment-methods.service';

@Injectable({
    providedIn: 'root'
})
export class MembershipInfoService {

    constructor(
        private subscriptionsService: SubscriptionsService,
        private plansService: PlansService,
        private stripePaymentMethodsService: StripePaymentMethodsService,
    ) { }

    public async getMembershipInfo() {
        const payload = {} as any;
        let subscription: any;
        let plan: any;
        let stripePaymentMethod: any;
        try {
            subscription = await this.subscriptionsService.getLatest();
            payload.versionNumber = subscription.versionNumber;
            plan = await this.plansService.getPlan(subscription.plan.planId, subscription.plan.versionNumber);
            stripePaymentMethod = await this.stripePaymentMethodsService.get(subscription.stripePaymentMethodId);
            payload.plan = plan;
            payload.stripePaymentMethod = stripePaymentMethod;
            payload.paymentDay = subscription.paymentDay;
            return payload;
        } catch (err) {
            return null;
        }
    }
}