import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditSourceComponent } from './credit-source/credit-source.component';
import { DebitSourceComponent } from './debit-source/debit-source.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';


const routes: Routes = [
  { path: 'credit-source', component: CreditSourceComponent, canActivate: [AuthGuard] },
  { path: 'debit-source', component: DebitSourceComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
