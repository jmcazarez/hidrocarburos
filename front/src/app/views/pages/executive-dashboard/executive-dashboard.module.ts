/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ExecutiveDashboardComponent } from './executive-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ExecutiveDashboardComponent
  }
]

@NgModule({
  declarations: [ExecutiveDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ExecutiveDashboardModule { }
