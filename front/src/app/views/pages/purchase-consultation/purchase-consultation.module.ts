/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { PurchaseConsultationComponent } from './purchase-consultation.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: PurchaseConsultationComponent
  }
]

@NgModule({
  declarations: [PurchaseConsultationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CurrencyMaskModule,
    NgxSpinnerModule
  ]
})
export class PurchaseConsultationModule { }
