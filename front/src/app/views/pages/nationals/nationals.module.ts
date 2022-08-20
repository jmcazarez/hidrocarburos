/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { NationalsComponent } from './nationals.component';
import { BusinessModule } from '../business/business.module';
import { BusquedasModule } from '../busquedas/busquedas.module';

const routes: Routes = [
  
  {
    path: '',
    component: NationalsComponent
  },
  
  
]

@NgModule({
  declarations: [NationalsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    BusquedasModule
  ],
  exports: [
    RouterModule
  ]
})
export class NationalsModule { }
