/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ParcelComponent } from './parcel.component';

const routes: Routes = [
  {
    path: '',
    component: ParcelComponent
  }
]

@NgModule({
  declarations: [ParcelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ParcelModule { }
