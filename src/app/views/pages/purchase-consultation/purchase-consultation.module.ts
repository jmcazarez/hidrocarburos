/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { PurchaseConsultationComponent } from './purchase-consultation.component';

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
  ]
})
export class PurchaseConsultationModule { }
