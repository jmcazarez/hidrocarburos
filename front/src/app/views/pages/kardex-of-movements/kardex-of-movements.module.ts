/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { KardexOfMovementsComponent } from './kardex-of-movements.component';

const routes: Routes = [
  {
    path: '',
    component: KardexOfMovementsComponent
  }
]

@NgModule({
  declarations: [KardexOfMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class KardexOfMovementsModule { }
