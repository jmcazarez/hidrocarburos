/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent
  }
]

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ProfilesModule { }
