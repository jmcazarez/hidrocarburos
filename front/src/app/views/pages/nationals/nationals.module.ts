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

const routes: Routes = [
  
  {
    path: '',
    component: NationalsComponent
  },
  
  
]

@NgModule({
  declarations: [NationalsComponent, BusquedaCompraComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    BusquedasModule,
    CurrencyMaskModule    
  ],
  exports: [
    RouterModule
  ]
})
export class NationalsModule { }
