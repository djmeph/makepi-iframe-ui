import { Injectable } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';
import { PlansService } from './plans.service';
import { PaymentMethodsService } from './payment-methods.service';

@Injectable({
    providedIn: 'root'
})
export class MembershipInfoService {

    constructor(
        private subscriptionsService: SubscriptionsService,
        private plansService: PlansService,
        private paymentMethodsService: PaymentMethodsService,
    ) { }

    public async getMembershipInfo() {
        const payload = {} as any;
        let subscription: any;
        let plan: any;
        let paymentMethod: any;
        subscription = await this.subscriptionsService.getLatest();
        payload.versionNumber = subscription.versionNumber;
        plan = await this.plansService.getPlan(subscription.plan.planId, subscription.plan.versionNumber);
        if (subscription.paymentMethodKey !== 'cash') {
            paymentMethod = await this.paymentMethodsService.get(subscription.paymentMethodKey);
        } else {
            paymentMethod = {
                source: {
                    funding: 'Cash/Check'
                }
            };
        }
        payload.plan = plan;
        payload.paymentMethod = paymentMethod;
        payload.paymentDay = subscription.paymentDay;
        return payload;
    }
}
