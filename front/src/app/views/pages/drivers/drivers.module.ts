/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { DriversComponent } from './drivers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BusquedaChoferComponent } from './busqueda-chofer/busqueda-chofer.component';

const routes: Routes = [
  {
    path: '',
    component: DriversComponent
  }
]

@NgModule({
  declarations: [DriversComponent,BusquedaChoferComponent],
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
export class DriversModule { }
