/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ConcentratedReportComponent } from './concentrated-report.component';

const routes: Routes = [
  {
    path: '',
    component: ConcentratedReportComponent
  }
]

@NgModule({
  declarations: [ConcentratedReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ConcentratedReportModule { }
