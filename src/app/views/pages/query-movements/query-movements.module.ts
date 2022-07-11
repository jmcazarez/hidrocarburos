/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { QueryMovementsComponent } from './query-movements.component';

const routes: Routes = [
  {
    path: '',
    component: QueryMovementsComponent
  }
]

@NgModule({
  declarations: [QueryMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class QueryMovementsModule { }
