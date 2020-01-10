import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripePaymentMethodsService } from '../stripe-payment-methods.service';

@Component({
    selector: 'app-delete-payment-method',
    templateUrl: './delete-payment-method.component.html',
    styleUrls: ['./delete-payment-method.component.scss']
})
export class DeletePaymentMethodComponent implements OnInit {

    stripePaymentMethodId: string;
    stripePaymentMethod: any;
    initializing: boolean;
    loading: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stripePaymentMethodsService: StripePaymentMethodsService,
    ) {
        this.stripePaymentMethodId = this.route.snapshot.params.id;
        this.initializing = true;
        this.loading = false;
    }

    async ngOnInit() {
        this.initializing = true;
        try {
            this.stripePaymentMethod = await this.stripePaymentMethodsService.get(this.stripePaymentMethodId);
            this.initializing = false;
        } catch (err) {
            this.initializing = false;
            console.error(err);
        }
    }

    async ok() {
        try {
            this.loading = true;
            await this.stripePaymentMethodsService.delete(this.stripePaymentMethodId);
            this.loading = false;
            this.router.navigate(['/checkout']);
        } catch (err) {
            this.loading = false;
            console.error(err);
        }
    }

    cancel() {
        this.router.navigate(['/checkout']);
    }

}
