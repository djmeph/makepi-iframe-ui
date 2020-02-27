import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditSourceComponent } from './credit-source/credit-source.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { DebitSourceComponent } from './debit-source/debit-source.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MembershipInfoComponent } from './membership-info/membership-info.component';
import { DeletePaymentMethodComponent } from './delete-payment-method/delete-payment-method.component';
import { CancelMembershipComponent } from './cancel-membership/cancel-membership.component';
import { VerifyDepositsComponent } from './verify-deposits/verify-deposits.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
    declarations: [
        AppComponent,
        CreditSourceComponent,
        DebitSourceComponent,
        CheckoutComponent,
        MembershipInfoComponent,
        DeletePaymentMethodComponent,
        CancelMembershipComponent,
        VerifyDepositsComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
