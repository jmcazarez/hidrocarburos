/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/* ---------- Components ---------- */
import { ProvidersComponent } from './providers.component';
import { BusquedaProvidersComponent } from './busqueda-providers/busqueda-providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent
  }
]

@NgModule({
  declarations: [ProvidersComponent,BusquedaProvidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RxReactiveFormsModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ]
})
export class ProvidersModule { }
