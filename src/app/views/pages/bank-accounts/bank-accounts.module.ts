/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { BankAccountsComponent } from './bank-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountsComponent
  }
]

@NgModule({
  declarations: [BankAccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class BankAccountsModule { }
