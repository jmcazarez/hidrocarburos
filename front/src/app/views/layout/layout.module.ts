/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

/* ---------- Components ---------- */
import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { ContentAnimateDirective } from '../../core/content-animate/content-animate.directive';

@NgModule({
  declarations: [
    BaseComponent, 
    NavbarComponent, 
    SidebarComponent, 
    FooterComponent, 
    ContentAnimateDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ]
})

export class LayoutModule { }
