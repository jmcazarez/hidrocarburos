/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ProductDeliveryTicketComponent } from './product-delivery-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDeliveryTicketComponent
  }
]

@NgModule({
  declarations: [ProductDeliveryTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ProductDeliveryTicketModule { }
