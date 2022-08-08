/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { GlobalStocksComponent } from './global-stocks.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalStocksComponent
  }
]

@NgModule({
  declarations: [GlobalStocksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class GlobalStocksModule { }
