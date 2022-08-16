/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/* ---------- Components ---------- */
import { BillsComponent } from './bills.component';
import { BusquedaConceptosDeGastosComponent } from './busqueda-conceptos-de-gastos/busqueda-conceptos-de-gastos.component';

const routes: Routes = [
  {
    path: '',
    component: BillsComponent
  }
]

@NgModule({
  declarations: [BillsComponent,BusquedaConceptosDeGastosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule, NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ]
})
export class BillsModule { }
