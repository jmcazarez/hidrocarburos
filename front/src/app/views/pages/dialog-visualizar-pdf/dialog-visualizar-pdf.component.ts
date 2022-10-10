import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-dialog-visualizar-pdf',
  templateUrl: './dialog-visualizar-pdf.component.html',
  styleUrls: ['./dialog-visualizar-pdf.component.scss']
})
export class DialogVisualizarPdfComponent implements OnInit {

  cBase64PdfSanitizado: any = '';
  @Input() public cTitulo?: string;
  @Input() public cBase64Pdf?: string;
  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    try {
      console.log(this.cBase64Pdf);
      this.cBase64PdfSanitizado = this.sanitizer.bypassSecurityTrustResourceUrl(this.cBase64Pdf ?? '');
    } catch (err) {
      console.log(err);
    }

  }


  cerrar(vm: any = this) {
    vm.activeModal.close();
  }

  @HostListener('window:keydown', ['$event'])
  manejarEventosTeclado(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape': {
        event.preventDefault();
        this.activeModal.close();
        break;
      }
    }
  }
}
