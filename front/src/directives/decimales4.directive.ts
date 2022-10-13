import { CurrencyPipe } from '@angular/common';
import { Directive, DoCheck, ElementRef, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appDecimales4]'
})
export class Decimales4Directive implements AfterViewInit  {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,4}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  private firstRun = true;

  constructor(private el: ElementRef, private cp: CurrencyPipe) {
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.value && this.el.nativeElement.value.length > 0) {
      this.el.nativeElement.value = this.cp.transform(this.el.nativeElement.value.replaceAll(',',''), ' ', 'symbol', '1.2-4');
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
    let next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }

  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: string) {
    this.el.nativeElement.value = value.replace('$', '').replaceAll(',', '');
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.el.nativeElement.value = this.cp.transform( value, ' ', 'symbol', '1.2-4');
  }

}
