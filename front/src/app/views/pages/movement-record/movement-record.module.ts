/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { MovementRecordComponent } from './movement-record.component';

const routes: Routes = [
  {
    path: '',
    component: MovementRecordComponent
  }
]

@NgModule({
  declarations: [MovementRecordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class MovementRecordModule { }
