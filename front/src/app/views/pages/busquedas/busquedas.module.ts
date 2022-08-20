import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaModalComponent } from './busqueda-modal/busqueda-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BusquedaModalComponent
  ],
  imports: [
    CommonModule,
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
export class BusquedasModule { }
