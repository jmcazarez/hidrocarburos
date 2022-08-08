/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ImportedComponent } from './imported.component';

const routes: Routes = [
  {
    path: '',
    component: ImportedComponent
  }
]

@NgModule({
  declarations: [ImportedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ImportedModule { }
