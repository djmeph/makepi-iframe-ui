import { Injectable } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';
import { PlansService } from './plans.service';
import { PaymentMethodsService } from './payment-methods.service';
import { SchedulesService, ScheduleStatuses } from './schedules.service';

@Injectable({
    providedIn: 'root'
})
export class MembershipInfoService {

    constructor(
        private subscriptionsService: SubscriptionsService,
        private plansService: PlansService,
        private paymentMethodsService: PaymentMethodsService,
        private schedulesService: SchedulesService,
    ) {}

    public async getMembershipInfo() {
        const payload = {} as any;
        let subscription: any;
        let plan: any;
        let paymentMethod: any;
        let unpaidSchedules: any;
        let paidSchedules: any;
        let lateSchedules: any;
        let cancelledSchedules: any;
        subscription = await this.subscriptionsService.getLatest();
        payload.versionNumber = subscription.versionNumber;
        plan = subscription.plan.planId === 'cancel' ? {} :
            await this.plansService.getPlan(subscription.plan.planId, subscription.plan.versionNumber);
        if (subscription.paymentMethodKey === null) {
            paymentMethod = {};
        } else if (subscription.paymentMethodKey === 'cash') {
            paymentMethod = {
                source: {
                    funding: 'Cash/Check'
                }
            };
        } else {
            paymentMethod = await this.paymentMethodsService.get(subscription.paymentMethodKey);
        }
        unpaidSchedules = await this.schedulesService.getByStatus(ScheduleStatuses.UNPAID);
        paidSchedules = await this.schedulesService.getByStatus(ScheduleStatuses.PAID);
        lateSchedules = await this.schedulesService.getByStatus(ScheduleStatuses.LATE);
        cancelledSchedules = await this.schedulesService.getByStatus(ScheduleStatuses.CANCELLED);
        payload.plan = plan;
        payload.paymentMethod = paymentMethod;
        payload.paymentDay = subscription.paymentDay;
        payload.unpaidSchedules = unpaidSchedules;
        payload.paidSchedules = paidSchedules;
        payload.lateSchedules = lateSchedules;
        payload.cancelledSchedules = cancelledSchedules;
        return payload;
    }
}
