import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditSourceComponent } from './credit-source/credit-source.component';


const routes: Routes = [
  { path: 'credit-source', component: CreditSourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
