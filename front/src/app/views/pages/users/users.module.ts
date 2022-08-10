/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
/* ---------- Components ---------- */
import { UsersComponent } from './users.component';
import { BusquedaModalComponent } from './busqueda-modal/busqueda-modal.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
]

@NgModule({
  declarations: [UsersComponent, BusquedaModalComponent],
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
export class UsersModule { }
