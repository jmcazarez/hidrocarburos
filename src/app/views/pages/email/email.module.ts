/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { EmailComponent } from './email.component';

const routes: Routes = [
  {
    path: '',
    component: EmailComponent
  }
]

@NgModule({
  declarations: [EmailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class EmailModule { }
