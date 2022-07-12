/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { IndirectCostRecordComponent } from './indirect-cost-record.component';

const routes: Routes = [
  {
    path: '',
    component: IndirectCostRecordComponent
  }
]

@NgModule({
  declarations: [IndirectCostRecordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class IndirectCostRecordModule { }
