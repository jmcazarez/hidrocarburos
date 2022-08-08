/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { InventoryMovementsComponent } from './inventory-movements.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryMovementsComponent
  }
]

@NgModule({
  declarations: [InventoryMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class InventoryMovementsModule { }
