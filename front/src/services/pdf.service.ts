import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogVisualizarPdfComponent } from 'src/app/views/pages/dialog-visualizar-pdf/dialog-visualizar-pdf.component';

@Injectable({
    providedIn: 'root'
})

export class PdfService {
    constructor(
        private modalService: NgbModal
    ) {
    }

    visualizarPdf(cBase64PDF: string, cTitulo: string,bEnfocar:boolean,idEnfocar:string, funcionEjecutar: any, vm: any) {
        let modal = this.modalService.open(DialogVisualizarPdfComponent, {
            centered: true,
            backdrop: 'static',
            size: 'md',
            modalDialogClass: 'dialog-formulario'
        });

        modal.componentInstance.cBase64Pdf = cBase64PDF;
        modal.componentInstance.cTitulo = cTitulo;

        modal.closed.subscribe(
            value => {
                if(bEnfocar)
                  //  this.utilsService.enfocar(idEnfocar ?? '');
                if(funcionEjecutar){
                    funcionEjecutar(vm);
                }
            }
        );
    }
}
