/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { RegisteredMovementsComponent } from './registered-movements.component';

const routes: Routes = [
  {
    path: '',
    component: RegisteredMovementsComponent
  }
]

@NgModule({
  declarations: [RegisteredMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class RegisteredMovementsModule { }
