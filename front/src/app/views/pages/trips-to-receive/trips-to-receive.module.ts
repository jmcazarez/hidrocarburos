/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { TripsToReceiveComponent } from './trips-to-receive.component';

const routes: Routes = [
  {
    path: '',
    component: TripsToReceiveComponent
  }
]

@NgModule({
  declarations: [TripsToReceiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class TripsToReceiveModule { }
