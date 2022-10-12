import { Decimales4Directive } from './../../../../directives/decimales4.directive';
/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { NationalsComponent } from './nationals.component';
import { BusinessModule } from '../business/business.module';
import { BusquedasModule } from '../busquedas/busquedas.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BusquedaCompraComponent } from './busqueda-compra/busqueda-compra.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const routes: Routes = [

  {
    path: '',
    component: NationalsComponent
  },


]

@NgModule({
  declarations: [NationalsComponent, BusquedaCompraComponent, Decimales4Directive],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    BusquedasModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ],
  exports: [
    RouterModule
  ]
})
export class NationalsModule { }
