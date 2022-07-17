/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { PurchaseAndReceptionComponent } from './purchase-and-reception.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseAndReceptionComponent
  }
]

@NgModule({
  declarations: [PurchaseAndReceptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PurchaseAndReceptionModule { }
