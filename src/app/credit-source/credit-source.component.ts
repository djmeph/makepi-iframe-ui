import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'config';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';
import { Pages } from '../models/pages';

interface CreditSourceStatus {
    accountHolderName: any;
}

@Component({
    selector: 'app-credit-source',
    templateUrl: './credit-source.component.html',
    styleUrls: ['./credit-source.component.scss']
})
export class CreditSourceComponent implements AfterViewInit {

    pages = Pages;

    cardNumber: any;
    cardExpiry: any;
    cardCvc: any;
    cardHandler = this.onChange.bind(this);
    stripeToken: any;
    stripeCardNumberError: any;
    stripeCardExpiryError: any;
    stripeCardCvcError: any;
    stripe: any;

    creditSourceStatus = {} as CreditSourceStatus;

    creditSourceForm = new FormGroup({
        cardHolderName: new FormControl(this.creditSourceStatus.accountHolderName, [
            Validators.required,
        ])
    });

    loading: boolean;

    constructor(
        private cd: ChangeDetectorRef,
        private stripePaymentMethodsService: StripePaymentMethodsService,
        private router: Router,
    ) { }

    ngAfterViewInit() {
        this.loading = false;
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
        if (this.loading) { return; }
        this.loading = true;
        const cardHolderName = this.creditSourceForm.get('cardHolderName').value;
        let response;
        let result;
        try {
            response = await this.stripe.createToken(this.cardNumber, { name: cardHolderName });
            result = await this.stripePaymentMethodsService.create(response.token.id);
            this.router.navigate(['/checkout']);
            this.loading = false;
        } catch (err) {
            this.loading = false;
            console.error(err);
        }
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
