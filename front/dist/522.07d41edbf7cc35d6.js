"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[522],{7522:(X,q,s)=>{s.r(q),s.d(q,{ProductDeliveryTicketModule:()=>W});var g=s(9808),b=s(9560),D=s(5886),m=s(5861),r=s(2382),h=s(1764),_=s(2217),e=s(4893),N=s(1075),F=s(1969),T=s(257),I=s(9238),k=s(5382),O=s(480),x=s(2111),J=s(2340),R=s(520);let z=(()=>{class i{constructor(n){this.http=n,this.urlFormasPago="catalogos/formas_pago",this.baseUrl=J.N.api}obtenerFormasPago(){return this.http.get(this.baseUrl+this.urlFormasPago)}}return i.\u0275fac=function(n){return new(n||i)(e.LFG(R.eN))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var S=s(8411),w=s(9066),M=s(2313);let L=(()=>{class i{constructor(n,o){this.activeModal=n,this.sanitizer=o,this.cBase64PdfSanitizado=""}ngOnInit(){var n;try{console.log(this.cBase64Pdf),this.cBase64PdfSanitizado=this.sanitizer.bypassSecurityTrustResourceUrl(null!==(n=this.cBase64Pdf)&&void 0!==n?n:"")}catch(o){console.log(o)}}cerrar(n=this){n.activeModal.close()}manejarEventosTeclado(n){"Escape"===n.key&&(n.preventDefault(),this.activeModal.close())}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(T.Kz),e.Y36(M.H7))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-dialog-visualizar-pdf"]],hostBindings:function(n,o){1&n&&e.NdJ("keydown",function(l){return o.manejarEventosTeclado(l)},!1,e.Jf7)},inputs:{cTitulo:"cTitulo",cBase64Pdf:"cBase64Pdf"},decls:11,vars:2,consts:[[1,"modal-header"],[3,"click"],[1,"modal-body"],[1,"row"],[1,"col"],[1,"contenido",3,"src"],[1,"modal-footer","d-flex","justify-content-start"]],template:function(n,o){if(1&n&&(e.TgZ(0,"div",0)(1,"span"),e._uU(2),e.qZA(),e.TgZ(3,"button",1),e.NdJ("click",function(){return o.cerrar()}),e.qZA()(),e.TgZ(4,"div",2)(5,"div",3)(6,"div",4),e._UZ(7,"iframe",5),e.qZA()()(),e.TgZ(8,"div",6)(9,"span"),e._uU(10,"<ESC> Salir"),e.qZA()()),2&n){let a;e.xp6(2),e.Oqu(null!==(a=o.cTitulo)&&void 0!==a?a:""),e.xp6(5),e.Q6J("src",o.cBase64PdfSanitizado,e.uOi)}},styles:[".contenido[_ngcontent-%COMP%]{width:100%;height:70vh;display:block}"]}),i})(),Y=(()=>{class i{constructor(n){this.modalService=n}visualizarPdf(n,o,a,l,t,u){let p=this.modalService.open(L,{centered:!0,backdrop:"static",size:"md",modalDialogClass:"dialog-formulario"});p.componentInstance.cBase64Pdf=n,p.componentInstance.cTitulo=o,p.closed.subscribe(f=>{a&&t&&t(u)})}}return i.\u0275fac=function(n){return new(n||i)(e.LFG(T.FF))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var Q=s(6529),A=s(5835);function B(i,d){if(1&i&&(e.TgZ(0,"tr"),e._uU(1,"\n                "),e.TgZ(2,"td"),e._uU(3),e.qZA(),e._uU(4,"\n                "),e.TgZ(5,"td"),e._uU(6),e.qZA(),e._uU(7,"\n                "),e.TgZ(8,"td"),e._uU(9),e.qZA(),e._uU(10,"\n                "),e.TgZ(11,"td"),e._uU(12),e.qZA(),e._uU(13,"\n                "),e.TgZ(14,"td"),e._uU(15),e.qZA(),e._uU(16,"\n                "),e.TgZ(17,"td"),e._uU(18),e.qZA(),e._uU(19,"\n                "),e.TgZ(20,"td"),e._uU(21),e.qZA(),e._uU(22,"\n                "),e.TgZ(23,"td"),e._uU(24),e.qZA(),e._uU(25,"\n                "),e.TgZ(26,"td"),e._uU(27),e.qZA(),e._uU(28,"\n                "),e.TgZ(29,"td",42),e._uU(30),e.ALo(31,"number"),e.qZA(),e._uU(32,"\n                "),e.TgZ(33,"td",42),e._uU(34),e.ALo(35,"number"),e.qZA(),e._uU(36,"\n                "),e.TgZ(37,"td",42),e._uU(38),e.ALo(39,"currency"),e.qZA(),e._uU(40,"\n                "),e.TgZ(41,"td",42),e._uU(42),e.ALo(43,"currency"),e.qZA(),e._uU(44,"\n                "),e.TgZ(45,"td",42),e._uU(46),e.ALo(47,"currency"),e.qZA(),e._uU(48,"\n                "),e.TgZ(49,"td",42),e._uU(50),e.ALo(51,"currency"),e.qZA(),e._uU(52,"\n                "),e.TgZ(53,"td"),e._uU(54),e.qZA(),e._uU(55,"\n              "),e.qZA()),2&i){const n=d.$implicit;e.xp6(3),e.Oqu(n.nVenta),e.xp6(3),e.Oqu(n.cFechaVenta),e.xp6(3),e.Oqu(n.cOrigen),e.xp6(3),e.Oqu(n.cDestino),e.xp6(3),e.Oqu(n.cVendedor),e.xp6(3),e.Oqu(n.cChofer),e.xp6(3),e.Oqu(n.cEquipo),e.xp6(3),e.Oqu(n.cPlaca),e.xp6(3),e.Oqu(n.cArticulo),e.xp6(3),e.Oqu(e.xi3(31,16,n.nCantidadEnviada,"1.2-2")),e.xp6(4),e.Oqu(e.xi3(35,19,n.nCantidadRecibida,"1.2-2")),e.xp6(4),e.Oqu(e.lcZ(39,22,n.nCostoLitro)),e.xp6(4),e.Oqu(e.lcZ(43,24,n.nTotal)),e.xp6(4),e.Oqu(e.lcZ(47,26,n.nAnticipo)),e.xp6(4),e.Oqu(e.lcZ(51,28,n.nTotal-n.nAnticipo)),e.xp6(4),e.Oqu(n.cFormaPago)}}const c=function(i){return{"has-error":i}},K=function(){return{prefix:"",thousands:",",decimal:".",precision:4}};let G=(()=>{class i{constructor(n,o,a,l,t,u,p,f,v,Z,U){this.service=n,this.util=o,this.modalService=a,this.patterns=l,this.serviceEmpresa=t,this.serviceChofer=u,this.serviceArticulo=p,this.serviceFormasPago=f,this.serviceEmpleados=v,this.serviceClientes=Z,this.pdfService=U,this.ventas=[],this.maxDate=new Date,this.nTotalEnviada=0,this.nTotalRecibida=0,this.nTotalGlobal=0}ngOnInit(){var n=this;return(0,m.Z)(function*(){n.form=new r.cw({nVenta:new r.NI({value:"",disabled:!0},[]),dFechaVenta:new r.NI(h().format("YYYY-MM-DD"),[r.kI.required]),cOrigen:new r.NI({value:"",disabled:!0},r.kI.required),nOrigen:new r.NI("",r.kI.required),nDestino:new r.NI("",r.kI.required),cDestino:new r.NI({value:"",disabled:!0},r.kI.required),nVendedor:new r.NI("",r.kI.required),cVendedor:new r.NI({value:"",disabled:!0},r.kI.required),cEquipo:new r.NI("",[r.kI.required]),cPlaca:new r.NI("",[r.kI.required]),cChofer:new r.NI({value:"",disabled:!0},r.kI.required),nChofer:new r.NI("",r.kI.required),nArticulo:new r.NI("",r.kI.required),cArticulo:new r.NI({value:"",disabled:!0},r.kI.required),nFormaPago:new r.NI(""),cFormaPago:new r.NI({value:"",disabled:!0}),nCantidadEnviada:new r.NI("",[r.kI.required]),nCantidadRecibida:new r.NI("",[r.kI.required]),nCostoLitro:new r.NI("",[r.kI.required]),nTotal:new r.NI({value:"",disabled:!0},r.kI.required),nAnticipo:new r.NI("",[]),cObservaciones:new r.NI("",[]),cEncargado:new r.NI("",[r.kI.required])}),n.obtener()})()}get nVenta(){var n,o,a;return(null===(n=this.form.get("nVenta"))||void 0===n?void 0:n.value)&&""!=(null===(o=this.form.get("nVenta"))||void 0===o?void 0:o.value)?null===(a=this.form.get("nVenta"))||void 0===a?void 0:a.value:0}get dFechaVenta(){var n;return null===(n=this.form.get("dFechaVenta"))||void 0===n?void 0:n.value}get nOrigen(){var n,o;return null!==(o=null===(n=this.form.get("nOrigen"))||void 0===n?void 0:n.value)&&void 0!==o?o:0}get nDestino(){var n,o;return null!==(o=null===(n=this.form.get("nDestino"))||void 0===n?void 0:n.value)&&void 0!==o?o:0}get nVendedor(){var n,o;return null!==(o=null===(n=this.form.get("nVendedor"))||void 0===n?void 0:n.value)&&void 0!==o?o:0}get nChofer(){var n;return null===(n=this.form.get("nChofer"))||void 0===n?void 0:n.value}get cEquipo(){var n,o;return null!==(o=null===(n=this.form.get("cEquipo"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get cPlaca(){var n,o;return null!==(o=null===(n=this.form.get("cPlaca"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get nArticulo(){var n,o;return null!==(o=null===(n=this.form.get("nArticulo"))||void 0===n?void 0:n.value)&&void 0!==o?o:0}get nCantidadEnviada(){var n,o;return null!==(o=null===(n=this.form.get("nCantidadEnviada"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get nCantidadRecibida(){var n,o;return null!==(o=null===(n=this.form.get("nCantidadRecibida"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get nCostoLitro(){var n,o;return null!==(o=null===(n=this.form.get("nCostoLitro"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get nTotal(){var n,o;return null!==(o=null===(n=this.form.get("nTotal"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get nAnticipo(){var n,o;return null!==(o=null===(n=this.form.get("nAnticipo"))||void 0===n?void 0:n.value)&&void 0!==o?o:0}get nFormaPago(){var n,o;return null!==(o=null===(n=this.form.get("nFormaPago"))||void 0===n?void 0:n.value)&&void 0!==o?o:-1}get cEncargado(){var n,o;return null!==(o=null===(n=this.form.get("cEncargado"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get cObservaciones(){var n,o;return null!==(o=null===(n=this.form.get("cObservaciones"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}get cFolioExterno(){var n,o;return null!==(o=null===(n=this.form.get("cFolioExterno"))||void 0===n?void 0:n.value)&&void 0!==o?o:""}calcularTotal(){var n;const o=this.nCantidadEnviada*this.nCostoLitro;return null===(n=this.form.get("nTotal"))||void 0===n||n.setValue(o),o}obtener(){var n=this;return(0,m.Z)(function*(){n.service.obtenerVentas(0).subscribe(o=>{n.ventas=o.data,n.ventas.sort((a,l)=>a.nVenta>l.nVenta?-1:1),n.ventas=n.ventas.slice(0,10),n.obtenerTotales()},o=>{n.util.dialogError("Ocurri\xf3 un error al obtener las ventas.")})})()}guardar(){var n=this;return(0,m.Z)(function*(){n.util.dialogConfirm("\xbfEst\xe1 seguro que desea guardar los datos?").then(o=>{if(o.isConfirmed){if(h(n.dFechaVenta)>h())return void n.util.dialogWarning("La fecha de venta no debe ser mayor a la fecha actual.");if(console.log("anticipo:",n.nAnticipo),console.log("forma:",n.nFormaPago),n.nAnticipo>0&&n.nFormaPago<0)return void n.util.dialogWarning("Debe proporcionar una forma de pago.");if((""==n.nAnticipo.toString()||0==n.nAnticipo)&&""!=n.nFormaPago.toString()&&n.nFormaPago>=0)return void n.util.dialogWarning("Debe proporcionar un anticipo.");const t={nVenta:n.nVenta,cFolioExterno:"",dFechaVenta:n.dFechaVenta,nOrigen:n.nOrigen,nDestino:n.nDestino,nVendedor:n.nVendedor,nChofer:n.nChofer,cEquipo:n.cEquipo,cPlaca:n.cPlaca,nArticulo:n.nArticulo,nCantidadEnviada:n.nCantidadEnviada,nCantidadRecibida:n.nCantidadRecibida,nCostoLitro:n.nCostoLitro,nAnticipo:n.nAnticipo,nFormaPago:n.nFormaPago,cEncargado:n.cEncargado,cObservaciones:n.cObservaciones,nTotal:n.calcularTotal()};n.service.guardarVenta(t).subscribe(function(){var u=(0,m.Z)(function*(p){""!==p.error?n.util.dialogError(p.error.error.type):(n.limpiar(),n.util.dialogSuccess("Venta guardada correctamente."),n.obtener())});return function(p){return u.apply(this,arguments)}}(),u=>{n.util.dialogError(u.error.error?u.error.error:"Error al guardar la venta.")})}})})()}limpiarCampo(n){console.log("value:",n.value),""===n.value&&n.setValue(null)}openModalEmpresas(n){var o=this;return(0,m.Z)(function*(){const a=o.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});a.componentInstance.titulo="B\xfasqueda de empresas",a.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nEmpresa"},{cNombre:"Empresa",cPropiedad:"cNombreEmpresa"}];const t=(yield o.serviceEmpresa.obtenerEmpresas(0).toPromise()).data.map(u=>({nEmpresa:u.nEmpresa,cNombreEmpresa:u.cNombreEmpresa}));a.componentInstance.data=t,a.componentInstance.dataTemp=t,a.closed.subscribe(u=>{console.log("value:",u),u&&u.id&&(1===n?o.asignarOrigen(u):o.asignarDestino(u),a.close())})})()}asignarOrigen(n){this.form.controls.cOrigen.setValue(n.cDescripcion),this.form.controls.nOrigen.setValue(n.id)}asignarDestino(n){this.form.controls.cDestino.setValue(n.cDescripcion),this.form.controls.nDestino.setValue(n.id)}openModalChoferes(){var n=this;return(0,m.Z)(function*(){const o=n.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});o.componentInstance.titulo="B\xfasqueda de choferes",o.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nChofer"},{cNombre:"Chofer",cPropiedad:"cDescripcion"}];const l=(yield n.serviceChofer.obtenerChoferes(0,-1).toPromise()).data.map(t=>({nChofer:t.nChofer,cDescripcion:t.cNombreChofer}));o.componentInstance.data=l,o.componentInstance.dataTemp=l,o.closed.subscribe(t=>{console.log("value:",t),t&&t.id&&(n.asignarChoferes(t),o.close())})})()}asignarChoferes(n){this.form.controls.cChofer.setValue(n.cDescripcion),this.form.controls.nChofer.setValue(n.id)}openModalArticulos(){var n=this;return(0,m.Z)(function*(){const o=n.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});o.componentInstance.titulo="B\xfasqueda de art\xedculos",o.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nArticulo"},{cNombre:"Art\xedculo",cPropiedad:"cDescripcion"}];const l=(yield n.serviceArticulo.obtenerArticulos(0,-1).toPromise()).data.map(t=>({nArticulo:t.nArticulo,cDescripcion:t.cDescripcionLarga}));o.componentInstance.data=l,o.componentInstance.dataTemp=l,o.closed.subscribe(t=>{console.log("value:",t),t&&t.id&&(n.asignarArticulo(t),o.close())})})()}asignarArticulo(n){this.form.controls.cArticulo.setValue(n.cDescripcion),this.form.controls.nArticulo.setValue(n.id)}openModalVendedores(){var n=this;return(0,m.Z)(function*(){const o=n.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});o.componentInstance.titulo="B\xfasqueda de vendedores",o.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nEmpleado"},{cNombre:"Vendedor",cPropiedad:"cDescripcion"}];const a=yield n.serviceEmpleados.obtenerEmpleados(0).toPromise();console.log(a);const l=a.data.map(t=>({nEmpleado:t.nEmpleado,cDescripcion:t.cNombreEmpleado}));o.componentInstance.data=l,o.componentInstance.dataTemp=l,o.closed.subscribe(t=>{console.log("value:",t),t&&t.id&&(n.asignarEmpleado(t),o.close())})})()}asignarEmpleado(n){this.form.controls.cVendedor.setValue(n.cDescripcion),this.form.controls.nVendedor.setValue(n.id)}openModalClientes(){var n=this;return(0,m.Z)(function*(){const o=n.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});o.componentInstance.titulo="B\xfasqueda de clientes",o.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nCliente"},{cNombre:"Cliente",cPropiedad:"cDescripcion"}];const l=(yield n.serviceClientes.obtenerClientes(0).toPromise()).data.map(t=>({nCliente:t.nCliente,cDescripcion:t.cNombreCliente}));o.componentInstance.data=l,o.componentInstance.dataTemp=l,o.closed.subscribe(t=>{console.log("value:",t),t&&t.id&&(n.asignarCliente(t),o.close())})})()}asignarCliente(n){this.form.controls.cDestino.setValue(n.cDescripcion),this.form.controls.nDestino.setValue(n.id)}openModalFormasPago(){var n=this;return(0,m.Z)(function*(){const o=n.modalService.open(_.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});o.componentInstance.titulo="B\xfasqueda de formas de pago",o.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nFormaPago"},{cNombre:"Forma de pago",cPropiedad:"cDescripcion"}];const l=(yield n.serviceFormasPago.obtenerFormasPago().toPromise()).data.map(t=>({nFormaPago:t.nFormaPago,cDescripcion:t.cDescripcion}));o.componentInstance.data=l,o.componentInstance.dataTemp=l,o.closed.subscribe(t=>{console.log("value:",t),t&&t.id>=0&&(n.asignarFormaPago(t),o.close())})})()}asignarFormaPago(n){this.form.controls.cFormaPago.setValue(n.cDescripcion),this.form.controls.nFormaPago.setValue(n.id)}limpiar(){this.form.controls.nVenta.setValue(""),this.form.controls.dFechaVenta.setValue(""),this.form.controls.nOrigen.setValue(""),this.form.controls.cOrigen.setValue(""),this.form.controls.nDestino.setValue(""),this.form.controls.cDestino.setValue(""),this.form.controls.nVendedor.setValue(""),this.form.controls.cVendedor.setValue(""),this.form.controls.cEncargado.setValue(""),this.form.controls.nChofer.setValue(""),this.form.controls.cChofer.setValue(""),this.form.controls.cEquipo.setValue(""),this.form.controls.cPlaca.setValue(""),this.form.controls.nArticulo.setValue(""),this.form.controls.cArticulo.setValue(""),this.form.controls.cObservaciones.setValue(""),this.form.controls.nCantidadEnviada.setValue(""),this.form.controls.nCantidadRecibida.setValue(""),this.form.controls.nCostoLitro.setValue(""),this.form.controls.nTotal.setValue(""),this.form.controls.nAnticipo.setValue(""),this.form.controls.nFormaPago.setValue(""),this.form.controls.cFormaPago.setValue("")}imprimir(){var n=this;return(0,m.Z)(function*(){yield n.service.obtenerTicketVenta().subscribe(function(){var o=(0,m.Z)(function*(a){console.log(a.data.pdf),n.pdfService.visualizarPdf(a.data.pdf,"Cotizaci\xf3n",!0,"venta-input-articulo",null,null)});return function(a){return o.apply(this,arguments)}}(),o=>{n.util.dialogError(o.error.error?o.error.error:"Error al generar ticket de venta.")})})()}obtenerTotales(){this.nTotalEnviada=this.ventas.reduce((n,o)=>n+Number(o.nCantidadEnviada),0),this.nTotalRecibida=this.ventas.reduce((n,o)=>n+Number(o.nCantidadRecibida),0),this.nTotalGlobal=this.ventas.reduce((n,o)=>n+Number(o.nTotal),0)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(N.v),e.Y36(F.F),e.Y36(T.FF),e.Y36(I.e),e.Y36(k.P),e.Y36(O.b),e.Y36(x.N),e.Y36(z),e.Y36(S.J),e.Y36(w.$),e.Y36(Y))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-product-delivery-ticket"]],decls:346,vars:53,consts:[[1,"page-breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","."],["aria-current","page",1,"breadcrumb-item","active"],[1,"row"],[1,"col-md-12","stretch-card"],[1,"card"],[1,"card-body"],[1,"card-title"],[3,"formGroup"],[1,"col-sm-6"],[1,"row","mb-3"],[1,"form-label","col-sm-3","col-form-label","text-end"],[1,"col-sm-9"],["type","text","placeholder","","formControlName","nVenta",1,"form-control","form-control-sm"],["type","date","placeholder","","formControlName","dFechaVenta",1,"form-control","form-control-sm",3,"max","ngClass"],[1,"input-group","mb-1"],["type","text","formControlName","cOrigen",1,"form-control","form-control-sm",3,"ngClass"],[1,"input-group-text","border-start-0","bg-white"],[1,"feather","icon-search",3,"click"],["type","text","formControlName","cVendedor",1,"form-control","form-control-sm",3,"ngClass"],["type","text","formControlName","cChofer",1,"form-control","form-control-sm",3,"ngClass"],["type","text","formControlName","cEquipo",1,"form-control","form-control-sm",3,"ngClass"],["type","text","placeholder","","formControlName","cPlaca",1,"form-control","form-control-sm",3,"ngClass"],["type","text","formControlName","cDestino",1,"form-control","form-control-sm",3,"ngClass"],["type","text","placeholder","","formControlName","cEncargado",1,"form-control","form-control-sm",3,"ngClass"],[1,"row","mt-4"],["type","text","formControlName","cArticulo",1,"form-control","form-control-sm",3,"ngClass"],["type","text","placeholder","","formControlName","nCantidadEnviada","appDecimales4","","onfocus","this.select()",1,"form-control","form-control-sm","text-end",3,"ngClass","blur"],["type","text","placeholder","","formControlName","nCantidadRecibida","appDecimales4","","onfocus","this.select()",1,"form-control","form-control-sm","text-end",3,"ngClass"],["type","text","placeholder","","formControlName","nCostoLitro","appDecimales4","","onfocus","this.select()",1,"form-control","form-control-sm","text-end",3,"ngClass","blur"],["type","text","placeholder","","formControlName","nTotal","currencyMask","",1,"form-control","form-control-sm",3,"options"],["type","text","placeholder","","formControlName","nAnticipo","appDecimales4","","onfocus","this.select()",1,"form-control","form-control-sm","text-end",3,"ngClass"],["type","text","formControlName","cFormaPago",1,"form-control","form-control-sm",3,"ngClass"],["formControlName","cObservaciones",1,"form-control","form-control-sm",3,"rows","maxLength"],[1,"d-flex","justify-content-end","my-4"],["type","button",1,"btn","btn-warning","mx-2",3,"click"],["type","button",1,"btn","btn-primary","mx-2",3,"disabled","click"],[1,"table-responsive","my-5"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"],[1,"text-end"]],template:function(n,o){if(1&n&&(e._uU(0,"\n"),e.TgZ(1,"nav",0),e._uU(2,"\n  "),e.TgZ(3,"ol",1),e._uU(4,"\n    "),e.TgZ(5,"li",2)(6,"a",3),e._uU(7,"Venta"),e.qZA()(),e._uU(8,"\n    "),e.TgZ(9,"li",4),e._uU(10,"Ticket de Entrega de Producto"),e.qZA(),e._uU(11,"\n  "),e.qZA(),e._uU(12,"\n"),e.qZA(),e._uU(13,"\n\n"),e._uU(14,"\n"),e.TgZ(15,"div",5),e._uU(16,"\n  "),e.TgZ(17,"div",6),e._uU(18,"\n    "),e.TgZ(19,"div",7),e._uU(20,"\n      "),e.TgZ(21,"div",8),e._uU(22,"\n        "),e.TgZ(23,"h6",9),e._uU(24,"Ticket de Entrega de Producto"),e.qZA(),e._uU(25,"\n        "),e.TgZ(26,"form",10),e._uU(27,"\n\n          "),e.TgZ(28,"div",5),e._uU(29,"\n            "),e.TgZ(30,"div",11),e._uU(31,"\n              "),e.TgZ(32,"div",12),e._uU(33,"\n                "),e.TgZ(34,"label",13),e._uU(35,"Folio"),e.qZA(),e._uU(36,"\n                "),e.TgZ(37,"div",14),e._uU(38,"\n                  "),e._UZ(39,"input",15),e._uU(40,"\n                "),e.qZA(),e._uU(41,"\n              "),e.qZA(),e._uU(42,"\n            "),e.qZA(),e._uU(43,"\n\n            "),e._uU(44,"\n\n            "),e.TgZ(45,"div",11),e._uU(46,"\n              "),e.TgZ(47,"div",12),e._uU(48,"\n                "),e.TgZ(49,"label",13),e._uU(50,"Fecha"),e.qZA(),e._uU(51,"\n                "),e.TgZ(52,"div",14),e._uU(53,"\n                  "),e._UZ(54,"input",16),e.ALo(55,"date"),e._uU(56,"\n                "),e.qZA(),e._uU(57,"\n              "),e.qZA(),e._uU(58,"\n            "),e.qZA(),e._uU(59,"\n          "),e.qZA(),e._uU(60,"\n\n          "),e.TgZ(61,"div",5),e._uU(62,"\n            "),e.TgZ(63,"div",11),e._uU(64,"\n\n              "),e.TgZ(65,"div",5),e._uU(66,"\n\n                "),e.TgZ(67,"label",13),e._uU(68,"Origen"),e.qZA(),e._uU(69,"\n                "),e.TgZ(70,"div",14),e._uU(71,"\n                  "),e.TgZ(72,"div",17),e._uU(73,"\n                    "),e._UZ(74,"input",18),e._uU(75,"\n                    "),e.TgZ(76,"span",19),e._uU(77,"\n                      "),e.TgZ(78,"i",20),e.NdJ("click",function(){return o.openModalEmpresas(1)}),e.qZA(),e._uU(79,"\n                    "),e.qZA(),e._uU(80,"\n                  "),e.qZA(),e._uU(81,"\n                "),e.qZA(),e._uU(82,"\n                "),e.TgZ(83,"label",13),e._uU(84,"Vendedor"),e.qZA(),e._uU(85,"\n                "),e.TgZ(86,"div",14),e._uU(87,"\n                  "),e.TgZ(88,"div",17),e._uU(89,"\n                    "),e._UZ(90,"input",21),e._uU(91,"\n                    "),e.TgZ(92,"span",19),e._uU(93,"\n                      "),e.TgZ(94,"i",20),e.NdJ("click",function(){return o.openModalVendedores()}),e.qZA(),e._uU(95,"\n                    "),e.qZA(),e._uU(96,"\n                  "),e.qZA(),e._uU(97,"\n                "),e.qZA(),e._uU(98,"\n                "),e.TgZ(99,"label",13),e._uU(100,"Chofer"),e.qZA(),e._uU(101,"\n                "),e.TgZ(102,"div",14),e._uU(103,"\n                  "),e.TgZ(104,"div",17),e._uU(105,"\n                    "),e._UZ(106,"input",22),e._uU(107,"\n                    "),e.TgZ(108,"span",19),e._uU(109,"\n                      "),e.TgZ(110,"i",20),e.NdJ("click",function(){return o.openModalChoferes()}),e.qZA(),e._uU(111,"\n                    "),e.qZA(),e._uU(112,"\n                  "),e.qZA(),e._uU(113,"\n                "),e.qZA(),e._uU(114,"\n                "),e.TgZ(115,"label",13),e._uU(116,"Equipo"),e.qZA(),e._uU(117,"\n                "),e.TgZ(118,"div",14),e._uU(119,"\n                  "),e.TgZ(120,"div",17),e._uU(121,"\n                    "),e._UZ(122,"input",23),e._uU(123,"\n                    "),e._uU(124,"\n                  "),e.qZA(),e._uU(125,"\n                "),e.qZA(),e._uU(126,"\n\n\n                "),e.TgZ(127,"label",13),e._uU(128,"Placa"),e.qZA(),e._uU(129,"\n                "),e.TgZ(130,"div",14),e._uU(131,"\n                  "),e._UZ(132,"input",24),e._uU(133,"\n                "),e.qZA(),e._uU(134,"\n              "),e.qZA(),e._uU(135,"\n            "),e.qZA(),e._uU(136,"\n\n            "),e.TgZ(137,"div",11),e._uU(138,"\n              "),e.TgZ(139,"div",5),e._uU(140,"\n\n                "),e.TgZ(141,"label",13),e._uU(142,"Destino"),e.qZA(),e._uU(143,"\n                "),e.TgZ(144,"div",14),e._uU(145,"\n                  "),e.TgZ(146,"div",17),e._uU(147,"\n                    "),e._UZ(148,"input",25),e._uU(149,"\n                    "),e.TgZ(150,"span",19),e._uU(151,"\n                      "),e.TgZ(152,"i",20),e.NdJ("click",function(){return o.openModalClientes()}),e.qZA(),e._uU(153,"\n                    "),e.qZA(),e._uU(154,"\n                  "),e.qZA(),e._uU(155,"\n                "),e.qZA(),e._uU(156,"\n\n                "),e.TgZ(157,"label",13),e._uU(158,"Encargado"),e.qZA(),e._uU(159,"\n                "),e.TgZ(160,"div",14),e._uU(161,"\n                  "),e._UZ(162,"input",26),e._uU(163,"\n                "),e.qZA(),e._uU(164,"\n\n              "),e.qZA(),e._uU(165,"\n            "),e.qZA(),e._uU(166,"\n          "),e.qZA(),e._uU(167,"\n\n          "),e.TgZ(168,"div",27),e._uU(169,"\n            "),e.TgZ(170,"div",11),e._uU(171,"\n\n              "),e.TgZ(172,"div",5),e._uU(173,"\n\n                "),e.TgZ(174,"label",13),e._uU(175,"Producto"),e.qZA(),e._uU(176,"\n                "),e.TgZ(177,"div",14),e._uU(178,"\n                  "),e.TgZ(179,"div",17),e._uU(180,"\n                    "),e._UZ(181,"input",28),e._uU(182,"\n                    "),e.TgZ(183,"span",19),e._uU(184,"\n                      "),e.TgZ(185,"i",20),e.NdJ("click",function(){return o.openModalArticulos()}),e.qZA(),e._uU(186,"\n                    "),e.qZA(),e._uU(187,"\n                  "),e.qZA(),e._uU(188,"\n                "),e.qZA(),e._uU(189,"\n\n                "),e.TgZ(190,"label",13),e._uU(191,"Cantidad Env (lts)"),e.qZA(),e._uU(192,"\n                "),e.TgZ(193,"div",14),e._uU(194,"\n                  "),e.TgZ(195,"input",29),e.NdJ("blur",function(){let l,t;return o.calcularTotal(),null==(l=o.form.get("nCantidadRecibida"))?null:l.setValue(null==(t=o.form.get("nCantidadEnviada"))?null:t.value)}),e.qZA(),e._uU(196,"\n                "),e.qZA(),e._uU(197,"\n\n                "),e.TgZ(198,"label",13),e._uU(199,"Cantidad Rec (lts)"),e.qZA(),e._uU(200,"\n                "),e.TgZ(201,"div",14),e._uU(202,"\n                  "),e._UZ(203,"input",30),e._uU(204,"\n                "),e.qZA(),e._uU(205,"\n\n                "),e.TgZ(206,"label",13),e._uU(207,"Costo litro"),e.qZA(),e._uU(208,"\n                "),e.TgZ(209,"div",14),e._uU(210,"\n                  "),e.TgZ(211,"input",31),e.NdJ("blur",function(){return o.calcularTotal()}),e.qZA(),e._uU(212,"\n                "),e.qZA(),e._uU(213,"\n\n                "),e.TgZ(214,"label",13),e._uU(215,"Total a pagar"),e.qZA(),e._uU(216,"\n                "),e.TgZ(217,"div",14),e._uU(218,"\n                  "),e._UZ(219,"input",32),e._uU(220,"\n                "),e.qZA(),e._uU(221,"\n\n                "),e.TgZ(222,"label",13),e._uU(223,"Anticipo"),e.qZA(),e._uU(224,"\n                "),e.TgZ(225,"div",14),e._uU(226,"\n                  "),e._UZ(227,"input",33),e._uU(228,"\n                "),e.qZA(),e._uU(229,"\n\n                "),e.TgZ(230,"label",13),e._uU(231,"Forma de pago"),e.qZA(),e._uU(232,"\n                "),e.TgZ(233,"div",14),e._uU(234,"\n                  "),e.TgZ(235,"div",17),e._uU(236,"\n                    "),e._UZ(237,"input",34),e._uU(238,"\n                    "),e.TgZ(239,"span",19),e._uU(240,"\n                      "),e.TgZ(241,"i",20),e.NdJ("click",function(){return o.openModalFormasPago()}),e.qZA(),e._uU(242,"\n                    "),e.qZA(),e._uU(243,"\n                  "),e.qZA(),e._uU(244,"\n                "),e.qZA(),e._uU(245,"\n\n              "),e.qZA(),e._uU(246,"\n            "),e.qZA(),e._uU(247,"\n\n            "),e.TgZ(248,"div",11),e._uU(249,"\n              "),e.TgZ(250,"div",5),e._uU(251,"\n                "),e.TgZ(252,"label",13),e._uU(253,"Observaciones"),e.qZA(),e._uU(254,"\n                "),e.TgZ(255,"div",14),e._uU(256,"\n                  "),e.TgZ(257,"textarea",35),e._uU(258,"\n                  "),e.qZA(),e._uU(259,"\n                "),e.qZA(),e._uU(260,"\n\n                "),e.TgZ(261,"div",36),e._uU(262,"\n                  "),e.TgZ(263,"button",37),e.NdJ("click",function(){return o.limpiar()}),e._uU(264,"Limpiar"),e.qZA(),e._uU(265,"\n                  "),e._uU(266,"\n                  "),e._uU(267,"\n                  "),e.TgZ(268,"button",38),e.NdJ("click",function(){return o.guardar()}),e._uU(269,"Guardar"),e.qZA(),e._uU(270,"\n                "),e.qZA(),e._uU(271,"\n\n              "),e.qZA(),e._uU(272,"\n            "),e.qZA(),e._uU(273,"\n          "),e.qZA(),e._uU(274,"\n\n        "),e.qZA(),e._uU(275,"\n\n\n        "),e.TgZ(276,"div",39),e._uU(277,"\n          "),e.TgZ(278,"table",40),e._uU(279,"\n            "),e.TgZ(280,"thead"),e._uU(281,"\n              "),e.TgZ(282,"tr"),e._uU(283,"\n                "),e.TgZ(284,"th"),e._uU(285,"Folio"),e.qZA(),e._uU(286,"\n                "),e.TgZ(287,"th"),e._uU(288,"Fecha"),e.qZA(),e._uU(289,"\n                "),e.TgZ(290,"th"),e._uU(291,"Origen"),e.qZA(),e._uU(292,"\n                "),e.TgZ(293,"th"),e._uU(294,"Destino"),e.qZA(),e._uU(295,"\n                "),e.TgZ(296,"th"),e._uU(297,"Vendedor"),e.qZA(),e._uU(298,"\n                "),e.TgZ(299,"th"),e._uU(300,"Chofer"),e.qZA(),e._uU(301,"\n                "),e.TgZ(302,"th"),e._uU(303,"Equipo"),e.qZA(),e._uU(304,"\n                "),e.TgZ(305,"th"),e._uU(306,"Placa"),e.qZA(),e._uU(307,"\n                "),e.TgZ(308,"th"),e._uU(309,"Producto"),e.qZA(),e._uU(310,"\n                "),e.TgZ(311,"th"),e._uU(312,"Cant. enviada"),e.qZA(),e._uU(313,"\n                "),e.TgZ(314,"th"),e._uU(315,"Cant. recibida"),e.qZA(),e._uU(316,"\n                "),e.TgZ(317,"th"),e._uU(318,"Costo litro"),e.qZA(),e._uU(319,"\n                "),e.TgZ(320,"th"),e._uU(321,"Valor"),e.qZA(),e._uU(322,"\n                "),e.TgZ(323,"th"),e._uU(324,"Anticipo"),e.qZA(),e._uU(325,"\n                "),e.TgZ(326,"th"),e._uU(327,"Saldo"),e.qZA(),e._uU(328,"\n                "),e.TgZ(329,"th"),e._uU(330,"Forma de pago"),e.qZA(),e._uU(331,"\n              "),e.qZA(),e._uU(332,"\n            "),e.qZA(),e._uU(333,"\n            "),e.TgZ(334,"tbody"),e._uU(335,"\n              "),e.YNc(336,B,56,30,"tr",41),e._uU(337,"\n\n            "),e.qZA(),e._uU(338,"\n            "),e._uU(339,"\n          "),e.qZA(),e._uU(340,"\n        "),e.qZA(),e._uU(341,"\n\n       \n      "),e.qZA(),e._uU(342,"\n    "),e.qZA(),e._uU(343,"\n  "),e.qZA(),e._uU(344,"\n"),e.qZA(),e._uU(345,"\n")),2&n){let a,l,t,u,p,f,v,Z,U,C,P,V,y,E;e.xp6(26),e.Q6J("formGroup",o.form),e.xp6(28),e.s9C("max",e.xi3(55,21,o.maxDate,"yyyy-MM-dd")),e.Q6J("ngClass",e.VKq(24,c,null==(a=o.form.get("dFechaVenta"))?null:a.hasError("required"))),e.xp6(20),e.Q6J("ngClass",e.VKq(26,c,null==(l=o.form.get("nOrigen"))?null:l.hasError("required"))),e.xp6(16),e.Q6J("ngClass",e.VKq(28,c,null==(t=o.form.get("nVendedor"))?null:t.hasError("required"))),e.xp6(16),e.Q6J("ngClass",e.VKq(30,c,null==(u=o.form.get("nChofer"))?null:u.hasError("required"))),e.xp6(16),e.Q6J("ngClass",e.VKq(32,c,null==(p=o.form.get("cEquipo"))?null:p.hasError("required"))),e.xp6(10),e.Q6J("ngClass",e.VKq(34,c,null==(f=o.form.get("cPlaca"))?null:f.hasError("required"))),e.xp6(16),e.Q6J("ngClass",e.VKq(36,c,null==(v=o.form.get("nDestino"))?null:v.hasError("required"))),e.xp6(14),e.Q6J("ngClass",e.VKq(38,c,null==(Z=o.form.get("cEncargado"))?null:Z.hasError("required"))),e.xp6(19),e.Q6J("ngClass",e.VKq(40,c,null==(U=o.form.get("nArticulo"))?null:U.hasError("required"))),e.xp6(14),e.Q6J("ngClass",e.VKq(42,c,null==(C=o.form.get("nCantidadEnviada"))?null:C.hasError("required"))),e.xp6(8),e.Q6J("ngClass",e.VKq(44,c,null==(P=o.form.get("nCantidadRecibida"))?null:P.hasError("required"))),e.xp6(8),e.Q6J("ngClass",e.VKq(46,c,null==(V=o.form.get("nCostoLitro"))?null:V.hasError("required"))),e.xp6(8),e.Q6J("options",e.DdM(48,K)),e.xp6(8),e.Q6J("ngClass",e.VKq(49,c,null==(y=o.form.get("nAnticipo"))?null:y.hasError("required"))),e.xp6(10),e.Q6J("ngClass",e.VKq(51,c,null==(E=o.form.get("nFormaPago"))?null:E.hasError("required"))),e.xp6(20),e.Q6J("rows",5)("maxLength",1e3),e.xp6(11),e.Q6J("disabled",o.form.invalid),e.xp6(68),e.Q6J("ngForOf",o.ventas)}},directives:[b.yS,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,g.mk,Q.w,A.g1,g.sg],pipes:[g.uU,g.JJ,g.H9],styles:[".table_wrapper[_ngcontent-%COMP%]{display:block;overflow-x:auto;white-space:nowrap}"]}),i})();var j=s(6282);const H=[{path:"",component:G}];let W=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[g.ez,b.Bz.forChild(H),D.m,A.zh,j.o]]}),i})()}}]);