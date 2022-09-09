/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
/* ---------- Components ---------- */
import { InventoryMovementsComponent } from './inventory-movements.component';
import { BusquedaInventoryMovementsComponent } from './busqueda-inventory-movements/busqueda-inventory-movements.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: InventoryMovementsComponent
  }
]

@NgModule({
  declarations: [InventoryMovementsComponent,BusquedaInventoryMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CurrencyMaskModule,NgxDatatableModule
  ]
})
export class InventoryMovementsModule { }
