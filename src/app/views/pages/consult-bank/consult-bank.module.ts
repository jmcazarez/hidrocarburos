/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ConsultBankComponent } from './consult-bank.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultBankComponent
  }
]

@NgModule({
  declarations: [ConsultBankComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ConsultBankModule { }
