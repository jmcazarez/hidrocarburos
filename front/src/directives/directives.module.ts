import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Decimales4Directive } from './decimales4.directive';
import { DecimalesDirective } from './decimales.directive';



@NgModule({
  declarations: [Decimales4Directive, DecimalesDirective],
  imports: [
    CommonModule
  ],
  exports: [
    Decimales4Directive,
    DecimalesDirective
  ]
})
export class DirectivesModule { }
