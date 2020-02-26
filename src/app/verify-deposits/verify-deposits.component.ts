import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';

@Component({
    selector: 'app-verify-deposits',
    templateUrl: './verify-deposits.component.html',
    styleUrls: ['./verify-deposits.component.scss']
})
export class VerifyDepositsComponent implements OnInit {

    method: any;
    stripePaymentMethodId: string;
    verified: boolean;
    loading: boolean;
    verifying: boolean;

    verifyStatus = {} as any;

    verifyForm = new FormGroup({
        deposit1: new FormControl(this.verifyStatus.paymentMethodKey, [
            Validators.required,
            Validators.min(1),
            Validators.max(99),
        ]),
        deposit2: new FormControl(this.verifyStatus.paymentMethodKey, [
            Validators.required,
            Validators.min(1),
            Validators.max(99),
        ])
    });

    constructor(
        private stripePaymentMethodsService: StripePaymentMethodsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.stripePaymentMethodId = this.route.snapshot.params.stripePaymentMethodId;
        this.verified = false;
        this.loading = true;
        this.verifying = false;
    }

    async ngOnInit() {
        this.loading = true;
        try {
            this.method = await this.stripePaymentMethodsService.get(this.stripePaymentMethodId);
            this.verified = this.method.verified;
            this.loading = false;
        } catch (err) {
            this.loading = false;
        }
    }

    async verify() {
        this.verifying = true;
        const { value: deposit1 } = this.verifyForm.get('deposit1');
        const { value: deposit2 } = this.verifyForm.get('deposit2');
        try {
            await this.stripePaymentMethodsService.verify(this.stripePaymentMethodId, [Number(deposit1), Number(deposit2)]);
            this.verifying = false;
            this.router.navigate(['/checkout']);
        } catch (err) {
            this.verifying = false;
            console.error(err);
        }

    }

    cancel() {
        this.router.navigate(['/checkout']);
    }

}
