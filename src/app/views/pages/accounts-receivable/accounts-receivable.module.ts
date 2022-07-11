/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { AccountsReceivableComponent } from './accounts-receivable.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsReceivableComponent
  }
]

@NgModule({
  declarations: [AccountsReceivableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AccountsReceivableModule { }
