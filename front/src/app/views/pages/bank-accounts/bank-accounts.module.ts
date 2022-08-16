/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/* ---------- Components ---------- */
import { BankAccountsComponent } from './bank-accounts.component';
import { BusquedaBancosComponent } from './busqueda-bancos/busqueda-bancos.component';
import { BusquedaCuentasComponent } from './busqueda-cuentas/busqueda-cuentas.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountsComponent
  }
]

@NgModule({
  declarations: [BankAccountsComponent,BusquedaBancosComponent,BusquedaCuentasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ]
})
export class BankAccountsModule { }
