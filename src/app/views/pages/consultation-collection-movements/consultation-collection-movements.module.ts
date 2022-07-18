/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ConsultationCollectionMovementsComponent } from './consultation-collection-movements.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultationCollectionMovementsComponent
  }
]

@NgModule({
  declarations: [ConsultationCollectionMovementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ConsultationCollectionMovementsModule { }
