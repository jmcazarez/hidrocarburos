/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { CreditRegisterComponent } from './credit-register.component';

const routes: Routes = [
  {
    path: '',
    component: CreditRegisterComponent
  }
]

@NgModule({
  declarations: [CreditRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class CreditRegisterModule { }
