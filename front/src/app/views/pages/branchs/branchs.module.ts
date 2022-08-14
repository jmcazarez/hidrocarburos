/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { BranchsComponent } from './branchs.component';
import { BusquedaSucursalComponent } from './busqueda-sucursal/busqueda-sucursal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: BranchsComponent
  }
]

@NgModule({
  declarations: [BranchsComponent, BusquedaSucursalComponent],
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
export class BranchsModule { }
