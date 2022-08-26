/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
/* ---------- Components ---------- */
import { TripsToReceiveComponent } from './trips-to-receive.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ConfirmacionRecepcionPedidosComponent } from './confirmacion-recepcion-pedidos/confirmacion-recepcion-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: TripsToReceiveComponent
  }
]

@NgModule({
  declarations: [TripsToReceiveComponent,ConfirmacionRecepcionPedidosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CurrencyMaskModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ]
})
export class TripsToReceiveModule { }
