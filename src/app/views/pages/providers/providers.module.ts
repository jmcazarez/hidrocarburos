/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ProvidersComponent } from './providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent
  }
]

@NgModule({
  declarations: [ProvidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ProvidersModule { }
