import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: SalesReportComponent
  }
]

@NgModule({
  declarations: [SalesReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CurrencyMaskModule,
  ]
})

export class SalesReportModule { }
