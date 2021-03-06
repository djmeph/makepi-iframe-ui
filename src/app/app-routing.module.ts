import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditSourceComponent } from './credit-source/credit-source.component';
import { DebitSourceComponent } from './debit-source/debit-source.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MembershipInfoComponent } from './membership-info/membership-info.component';
import { DeletePaymentMethodComponent } from './delete-payment-method/delete-payment-method.component';
import { CancelMembershipComponent } from './cancel-membership/cancel-membership.component';
import { VerifyDepositsComponent } from './verify-deposits/verify-deposits.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';


const routes: Routes = [
    { path: 'credit-source', component: CreditSourceComponent, canActivate: [AuthGuard] },
    { path: 'debit-source', component: DebitSourceComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'membership-info', component: MembershipInfoComponent, canActivate: [AuthGuard] },
    { path: 'delete-payment-method/:id', component: DeletePaymentMethodComponent, canActivate: [AuthGuard] },
    { path: 'cancel-membership', component: CancelMembershipComponent, canActivate: [AuthGuard] },
    { path: 'verify-deposits/:stripePaymentMethodId', component: VerifyDepositsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
