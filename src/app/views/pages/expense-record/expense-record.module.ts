/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ExpenseRecordComponent } from './expense-record.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseRecordComponent
  }
]

@NgModule({
  declarations: [ExpenseRecordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ExpenseRecordModule { }
