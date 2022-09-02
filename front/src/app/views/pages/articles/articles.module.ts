/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
/* import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
 */import { NgxDatatableModule } from '@swimlane/ngx-datatable';
 import { CurrencyMaskModule } from 'ng2-currency-mask';
/* ---------- Components ---------- */
import { ArticlesComponent } from './articles.component';
import { BusquedaArticlesComponent } from './busqueda-articles/busqueda-articles.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  }
]

@NgModule({
  declarations: [ArticlesComponent,BusquedaArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CurrencyMaskModule,
   /*  RxReactiveFormsModule, */
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay datos disponibles', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ]
})
export class ArticlesModule { }
