import { CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDecimales]',
})
export class DecimalesDirective implements AfterViewInit {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];
  private firstRun = true;

  constructor(
    private el: ElementRef,
    private cp: CurrencyPipe,
    private dp: DecimalPipe
  ) {}

  ngAfterViewInit() {
    if (this.el.nativeElement.value && this.el.nativeElement.value.length > 0) {
      // this.el.nativeElement.value = this.cp.transform(this.el.nativeElement.value.replaceAll(',',''), ' ', 'symbol', '1.2-2');
      this.el.nativeElement.value = this.dp.transform(
        this.el.nativeElement.value.replaceAll(',', ''),
        '1.2-2',
        'en-US'
      );
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    let next: string = [
      current.slice(0, position),
      event.key == 'Decimal' ? '.' : event.key,
      current.slice(position),
    ].join('');

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    this.el.nativeElement.value = value.replace('$', '').replaceAll(',', '');
    (<HTMLInputElement>(
      document.getElementById(this.el.nativeElement.id)
    )).select();
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    // this.el.nativeElement.value = this.cp.transform( value, '1.2-4');
    this.el.nativeElement.value = this.dp.transform(value, '1.2-2', 'en-US');
  }

  // @HostListener('ngModelChange', ['$event']) onChange(event: any) {
  //   // "event" will be the value of the input
  //   this.el.nativeElement.value = this.dp.transform(event, '1.2-2', 'en-US');
  // }
}