"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[402],{2217:(b,f,a)=>{a.d(f,{z:()=>o});var r=a(4893),v=a(257),g=a(2382),_=a(6166),t=a(9808);function h(m,U){if(1&m&&r._UZ(0,"ngx-datatable-column",8),2&m){const l=U.$implicit;r.Q6J("name",l.cNombre)("prop",l.cPropiedad)}}let o=(()=>{class m{constructor(l,u){this.activeModal=l,this.modalService=u,this.data=[],this.dataTemp=[],this.props=[],this.valueBuscador=""}ngOnInit(){}ngAfterViewChecked(){window.dispatchEvent(new Event("resize"))}close(l=this){l.activeModal.close({})}filterDatatable(l){if(this.data=this.dataTemp,""===l.target.value)this.data=this.dataTemp;else{const u=l.target.value.toLowerCase(),A=this.data.filter(Z=>-1!==Z[Object.keys(Z)[0]].toString().toLowerCase().indexOf(u)||!u||-1!==Z[Object.keys(Z)[1]].toLowerCase().indexOf(u)||!u);this.data=A}}onClick(l){"click"==l.type&&(this.selectedRow&&this.selectedRow[Object.keys(this.selectedRow)[0]]==l.row[Object.keys(l.row)[0]]?this.activeModal.close({id:this.selectedRow[Object.keys(this.selectedRow)[0]],cDescripcion:this.selectedRow[Object.keys(this.selectedRow)[1]]}):this.selectedRow=l.row)}}return m.\u0275fac=function(l){return new(l||m)(r.Y36(v.Kz),r.Y36(v.FF))},m.\u0275cmp=r.Xpm({type:m,selectors:[["app-busqueda-modal"]],inputs:{titulo:"titulo",data:"data",dataTemp:"dataTemp",props:"props"},decls:10,vars:12,consts:[[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],[1,"modal-body"],["type","text","matInput","","placeholder","Buscar ...",3,"ngModel","keyup","ngModelChange"],[1,"material","shadow-none",3,"rows","loadingIndicator","columnMode","headerHeight","footerHeight","rowHeight","reorderable","limit","scrollbarH","activate"],[3,"name","prop",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],[3,"name","prop"]],template:function(l,u){1&l&&(r.TgZ(0,"div",0)(1,"h5",1),r._uU(2),r.qZA()(),r.TgZ(3,"div",2)(4,"input",3),r.NdJ("keyup",function(Z){return u.filterDatatable(Z)})("ngModelChange",function(Z){return u.valueBuscador=Z}),r.qZA(),r.TgZ(5,"ngx-datatable",4),r.NdJ("activate",function(Z){return u.onClick(Z)}),r.YNc(6,h,1,2,"ngx-datatable-column",5),r.qZA()(),r.TgZ(7,"div",6)(8,"button",7),r.NdJ("click",function(){return u.close()}),r._uU(9," Cerrar "),r.qZA()()),2&l&&(r.xp6(2),r.Oqu(u.titulo),r.xp6(2),r.Q6J("ngModel",u.valueBuscador),r.xp6(1),r.Q6J("rows",u.data)("loadingIndicator",u.loadingIndicator)("columnMode","force")("headerHeight",50)("footerHeight",50)("rowHeight","auto")("reorderable",u.reorderable)("limit",10)("scrollbarH",!0),r.xp6(1),r.Q6J("ngForOf",u.props))},directives:[g.Fj,g.JJ,g.On,_.nE,t.sg,_.UC],styles:[""]}),m})()},3402:(b,f,a)=>{a.r(f),a.d(f,{PurchaseConsultationModule:()=>M});var r=a(9808),v=a(9560),g=a(5886),_=a(5861),t=a(2382),h=a(2217),o=a(4893),m=a(9378),U=a(1969),l=a(257),u=a(9238),A=a(5382),Z=a(7881),P=a(3723),E=a(2111),q=a(72);function F(d,T){if(1&d&&(o.TgZ(0,"tr"),o._uU(1,"\n                  "),o.TgZ(2,"td"),o._uU(3),o.qZA(),o._uU(4,"\n                  "),o.TgZ(5,"td"),o._uU(6),o.qZA(),o._uU(7,"\n                  "),o.TgZ(8,"td"),o._uU(9),o.qZA(),o._uU(10,"\n                  "),o.TgZ(11,"td"),o._uU(12),o.qZA(),o._uU(13,"\n                  "),o.TgZ(14,"td"),o._uU(15),o.qZA(),o._uU(16,"\n                  "),o.TgZ(17,"td"),o._uU(18),o.qZA(),o._uU(19,"\n                  "),o.TgZ(20,"td"),o._uU(21),o.qZA(),o._uU(22,"\n                  "),o.TgZ(23,"td",37),o._uU(24),o.ALo(25,"number"),o.qZA(),o._uU(26,"\n                  "),o.TgZ(27,"td",37),o._uU(28),o.ALo(29,"number"),o.qZA(),o._uU(30,"\n                  "),o.TgZ(31,"td",37),o._uU(32),o.ALo(33,"number"),o.qZA(),o._uU(34,"\n\n                  "),o.TgZ(35,"td",37),o._uU(36),o.ALo(37,"number"),o.qZA(),o._uU(38,"\n                  "),o.TgZ(39,"td",37),o._uU(40),o.ALo(41,"number"),o.qZA(),o._uU(42,"\n                  "),o.TgZ(43,"td",37),o._uU(44),o.ALo(45,"number"),o.qZA(),o._uU(46,"\n                  "),o.TgZ(47,"td",37),o._uU(48),o.ALo(49,"number"),o.qZA(),o._uU(50,"\n                  "),o.TgZ(51,"td",37),o._uU(52),o.ALo(53,"number"),o.qZA(),o._uU(54,"\n\n                  "),o.TgZ(55,"td",37),o._uU(56),o.ALo(57,"number"),o.qZA(),o._uU(58,"\n                "),o.qZA()),2&d){const e=T.$implicit;o.xp6(3),o.Oqu(e.nCompra),o.xp6(3),o.Oqu("N"===e.cTipoCompra?"Nacional":"Importada"),o.xp6(3),o.Oqu(e.cFechaCompra),o.xp6(3),o.Oqu(e.cEmpresa),o.xp6(3),o.Oqu(e.cProveedor),o.xp6(3),o.Oqu(e.cAlmacen),o.xp6(3),o.Oqu(e.cArticulo),o.xp6(3),o.Oqu(o.xi3(25,16,e.nLitrosCompra,"1.2-2")),o.xp6(4),o.Oqu("N"===e.cTipoCompra?"":o.xi3(29,19,e.nCostoLitro,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(33,22,e.nCostoLitroNacional,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(37,25,e.nCostoTotal,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(41,28,e.nCostoFactura,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(45,31,e.nCostoFlete,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(49,34,e.nCostoCruce,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(53,37,e.nCostoLogistico,"1.2-2")),o.xp6(4),o.Oqu(o.xi3(57,40,e.nCostoTotalFinal,"1.2-2"))}}function I(d,T){if(1&d&&(o.TgZ(0,"div",34),o._uU(1,"\n            "),o.TgZ(2,"table",35),o._uU(3,"\n              "),o.TgZ(4,"thead"),o._uU(5,"\n                "),o.TgZ(6,"tr"),o._uU(7,"\n                  "),o.TgZ(8,"th"),o._uU(9,"Folio"),o.qZA(),o._uU(10,"\n                  "),o.TgZ(11,"th"),o._uU(12,"Tipo"),o.qZA(),o._uU(13,"\n                  "),o.TgZ(14,"th"),o._uU(15,"Fecha de compra"),o.qZA(),o._uU(16,"\n                  "),o.TgZ(17,"th"),o._uU(18,"Comprador"),o.qZA(),o._uU(19,"\n                  "),o.TgZ(20,"th"),o._uU(21,"Proveedor"),o.qZA(),o._uU(22,"\n                  "),o.TgZ(23,"th"),o._uU(24,"Almac\xe9n recepci\xf3n"),o.qZA(),o._uU(25,"\n                  "),o.TgZ(26,"th"),o._uU(27,"Art\xedculo"),o.qZA(),o._uU(28,"\n                  "),o.TgZ(29,"th"),o._uU(30,"Litros"),o.qZA(),o._uU(31,"\n                  "),o.TgZ(32,"th"),o._uU(33,"Costo por litro USA"),o.qZA(),o._uU(34,"\n                  "),o.TgZ(35,"th"),o._uU(36,"Costo por litro MX"),o.qZA(),o._uU(37,"\n                  "),o.TgZ(38,"th"),o._uU(39,"Costo compra origen"),o.qZA(),o._uU(40,"\n                  "),o.TgZ(41,"th"),o._uU(42,"Costo factura"),o.qZA(),o._uU(43,"\n                  "),o.TgZ(44,"th"),o._uU(45,"Costo flete"),o.qZA(),o._uU(46,"\n                  "),o.TgZ(47,"th"),o._uU(48,"Costo cruce"),o.qZA(),o._uU(49,"\n                  "),o.TgZ(50,"th"),o._uU(51,"Costo log\xedstico"),o.qZA(),o._uU(52,"\n\n                  "),o.TgZ(53,"th"),o._uU(54,"Gran total compra"),o.qZA(),o._uU(55,"\n                "),o.qZA(),o._uU(56,"\n              "),o.qZA(),o._uU(57,"\n              "),o.TgZ(58,"tbody"),o._uU(59,"\n                "),o.YNc(60,F,59,43,"tr",36),o._uU(61,"\n              "),o.qZA(),o._uU(62,"\n            "),o.qZA(),o._uU(63,"\n          "),o.qZA()),2&d){const e=o.oxw();o.xp6(60),o.Q6J("ngForOf",e.compras)}}let N=(()=>{class d{constructor(e,n,i,p,s,C,c,L,D){this.service=e,this.util=n,this.modalService=i,this.patterns=p,this.serviceEmpresa=s,this.serviceAlmacen=C,this.serviceProveedor=c,this.serviceArticulo=L,this.spinner=D,this.compras=[]}ngOnInit(){var e=this;return(0,_.Z)(function*(){e.form=new t.cw({nCompra:new t.NI("",[]),cTipoCompra:new t.NI("",[]),cEmpresa:new t.NI({value:"",disabled:!0},[]),nEmpresa:new t.NI("",[]),nAlmacen:new t.NI("",[]),cAlmacen:new t.NI({value:"",disabled:!0},[]),nProveedor:new t.NI("",t.kI.required),cProveedor:new t.NI({value:"",disabled:!0},[]),nArticulo:new t.NI("",t.kI.required),cArticulo:new t.NI({value:"",disabled:!0},[]),dFechaInicio:new t.NI("",[]),dFechaFin:new t.NI("",[])})})()}get nCompra(){var e,n,i;return(null===(e=this.form.get("nCompra"))||void 0===e?void 0:e.value)&&""!=(null===(n=this.form.get("nCompra"))||void 0===n?void 0:n.value)?null===(i=this.form.get("nCompra"))||void 0===i?void 0:i.value:0}get cTipoCompra(){var e,n;return null!==(n=null===(e=this.form.get("cTipoCompra"))||void 0===e?void 0:e.value)&&void 0!==n?n:""}get nEmpresa(){var e,n,i;return(null===(e=this.form.get("nEmpresa"))||void 0===e?void 0:e.value)&&""!=(null===(n=this.form.get("nEmpresa"))||void 0===n?void 0:n.value)?null===(i=this.form.get("nEmpresa"))||void 0===i?void 0:i.value:0}get nAlmacen(){var e,n,i;return(null===(e=this.form.get("nAlmacen"))||void 0===e?void 0:e.value)&&""!=(null===(n=this.form.get("nAlmacen"))||void 0===n?void 0:n.value)?null===(i=this.form.get("nAlmacen"))||void 0===i?void 0:i.value:0}get nProveedor(){var e,n,i;return(null===(e=this.form.get("nProveedor"))||void 0===e?void 0:e.value)&&""!=(null===(n=this.form.get("nProveedor"))||void 0===n?void 0:n.value)?null===(i=this.form.get("nProveedor"))||void 0===i?void 0:i.value:0}get dFechaInicio(){var e;return null===(e=this.form.get("dFechaInicio"))||void 0===e?void 0:e.value}get dFechaFin(){var e;return null===(e=this.form.get("dFechaFin"))||void 0===e?void 0:e.value}get nArticulo(){var e,n,i;return(null===(e=this.form.get("nArticulo"))||void 0===e?void 0:e.value)&&""!=(null===(n=this.form.get("nArticulo"))||void 0===n?void 0:n.value)?null===(i=this.form.get("nArticulo"))||void 0===i?void 0:i.value:0}openModalEmpresas(){var e=this;return(0,_.Z)(function*(){const n=e.modalService.open(h.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});n.componentInstance.titulo="B\xfasqueda de empresas",n.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nEmpresa"},{cNombre:"Empresa",cPropiedad:"cNombreEmpresa"}];const p=(yield e.serviceEmpresa.obtenerEmpresas(0).toPromise()).data.map(s=>({nEmpresa:s.nEmpresa,cNombreEmpresa:s.cNombreEmpresa}));n.componentInstance.data=p,n.componentInstance.dataTemp=p,n.closed.subscribe(s=>{console.log("value:",s),s&&s.id&&(e.asignarEmpresa(s),n.close())})})()}asignarEmpresa(e){this.form.controls.cEmpresa.setValue(e.cDescripcion),this.form.controls.nEmpresa.setValue(e.id)}openModalAlmacenes(){var e=this;return(0,_.Z)(function*(){const n=e.modalService.open(h.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});n.componentInstance.titulo="B\xfasqueda de almacenes",n.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nAlmacen"},{cNombre:"Almac\xe9n",cPropiedad:"cDescripcion"}];const p=(yield e.serviceAlmacen.obtenerAlmacenes(0).toPromise()).data.map(s=>({nAlmacen:s.nAlmacen,cDescripcion:s.cDescripcion}));n.componentInstance.data=p,n.componentInstance.dataTemp=p,n.closed.subscribe(s=>{console.log("value:",s),s&&s.id&&(e.asignarAlmacen(s),n.close())})})()}asignarAlmacen(e){this.form.controls.cAlmacen.setValue(e.cDescripcion),this.form.controls.nAlmacen.setValue(e.id)}openModalProveedores(){var e=this;return(0,_.Z)(function*(){const n=e.modalService.open(h.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});n.componentInstance.titulo="B\xfasqueda de proveedores",n.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nProveedor"},{cNombre:"Proveedor",cPropiedad:"cDescripcion"}];const p=(yield e.serviceProveedor.obtenerProveedores(0,-1).toPromise()).data.map(s=>({nProveedor:s.nProveedor,cDescripcion:s.cNombreProveedor}));n.componentInstance.data=p,n.componentInstance.dataTemp=p,n.closed.subscribe(s=>{console.log("value:",s),s&&s.id&&(e.asignarProveedor(s),n.close())})})()}asignarProveedor(e){this.form.controls.cProveedor.setValue(e.cDescripcion),this.form.controls.nProveedor.setValue(e.id)}openModalArticulos(){var e=this;return(0,_.Z)(function*(){const n=e.modalService.open(h.z,{centered:!0,backdrop:"static",keyboard:!1,modalDialogClass:"dialog-formulario-chico"});n.componentInstance.titulo="B\xfasqueda de art\xedculos",n.componentInstance.props=[{cNombre:"Folio",cPropiedad:"nArticulo"},{cNombre:"Art\xedculo",cPropiedad:"cDescripcion"}];const p=(yield e.serviceArticulo.obtenerArticulos(0,-1).toPromise()).data.map(s=>({nArticulo:s.nArticulo,cDescripcion:s.cDescripcionLarga}));n.componentInstance.data=p,n.componentInstance.dataTemp=p,n.closed.subscribe(s=>{console.log("value:",s),s&&s.id&&(e.asignarArticulo(s),n.close())})})()}asignarArticulo(e){this.form.controls.cArticulo.setValue(e.cDescripcion),this.form.controls.nArticulo.setValue(e.id)}consultar(){var e,n,i,p,s;this.spinner.show(),this.compras=[],this.service.obtenerConsultaCompras(this.cTipoCompra,this.dFechaInicio?new Date(this.dFechaInicio).toISOString().split("T")[0]:"",this.dFechaFin?new Date(this.dFechaFin).toISOString().split("T")[0]:"",null!==(e=this.nCompra)&&void 0!==e?e:0,null!==(n=this.nEmpresa)&&void 0!==n?n:0,null!==(i=this.nProveedor)&&void 0!==i?i:0,null!==(p=this.nAlmacen)&&void 0!==p?p:0,null!==(s=this.nArticulo)&&void 0!==s?s:0,"").subscribe(C=>{if(C){for(const c of C.data)c.nCostoLitroNacional="I"===c.cTipoCompra?c.nCostoTotalFinal/c.nLitrosCompra:c.nCostoLitro,this.compras.push({nCompra:c.nCompra,cTipoCompra:c.cTipoCompra,cFechaCompra:c.cFechaCompra,cEmpresa:c.cEmpresa,nEmpresa:c.nEmpresa,nAlmacen:c.nAlmacen,cAlmacen:c.cAlmacen,nProveedor:c.nProveedor,cProveedor:c.cProveedor,nArticulo:c.nArticulo,cArticulo:c.cArticulo,dFechaInicio:c.dFechaInicio,dFechaFin:c.dFechaFin,nLitrosCompra:c.nLitrosCompra,nCostoLitro:c.nCostoLitro,nCostoTotal:c.nCostoTotal,nCostoFactura:c.nCostoFactura,nCostoFlete:c.nCostoFlete,nCostoLogistico:c.nCostoLogistico*c.nTipoCambio,nCostoCruce:c.nCostoCruce*c.nTipoCambioLocal,nCostoTotalFinal:c.nCostoTotalFinal,nCostoLitroNacional:c.nCostoLitroNacional}),console.log(c.nTipoCambioLocal);console.log("Compras:",C)}this.spinner.hide()},C=>{this.spinner.hide()})}limpiar(){this.form.controls.nCompra.setValue(""),this.form.controls.cTipoCompra.setValue(""),this.form.controls.cEmpresa.setValue(""),this.form.controls.nEmpresa.setValue(""),this.form.controls.nAlmacen.setValue(""),this.form.controls.cAlmacen.setValue(""),this.form.controls.nProveedor.setValue(""),this.form.controls.cProveedor.setValue(""),this.form.controls.dFechaInicio.setValue(""),this.form.controls.dFechaFin.setValue(""),this.form.controls.nArticulo.setValue(""),this.form.controls.cArticulo.setValue(""),this.compras=[]}}return d.\u0275fac=function(e){return new(e||d)(o.Y36(m.K),o.Y36(U.F),o.Y36(l.FF),o.Y36(u.e),o.Y36(A.P),o.Y36(Z.O),o.Y36(P.z),o.Y36(E.N),o.Y36(q.t2))},d.\u0275cmp=o.Xpm({type:d,selectors:[["app-purchase-consultation"]],decls:172,vars:2,consts:[[1,"page-breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","."],["aria-current","page",1,"breadcrumb-item","active"],[1,"row"],[1,"col-md-12","stretch-card"],[1,"card"],[1,"card-body"],[1,"card-title"],[3,"formGroup"],[1,"row","mt-4"],[1,"col-sm-5"],[1,"form-label","col-sm-5","col-form-label","text-end"],[1,"col-sm-7"],[1,"input-group","mb-1"],["formControlName","cTipoCompra",1,"form-control","form-control-sm"],["value",""],["value","N"],["value","I"],["type","number","formControlName","nCompra",1,"form-control","form-control-sm"],["type","text","formControlName","cEmpresa",1,"form-control","form-control-sm","border-end-0"],[1,"input-group-text","border-start-0","bg-white"],[1,"feather","icon-search",3,"click"],["type","text","formControlName","cProveedor",1,"form-control","form-control-sm","border-end-0"],["type","text","formControlName","cAlmacen",1,"form-control","form-control-sm","border-end-0"],["type","text","formControlName","cArticulo",1,"form-control","form-control-sm","border-end-0"],[1,"col-sm-2"],["type","date","placeholder","","formControlName","dFechaInicio",1,"form-control","form-control-sm"],["type","date","placeholder","","formControlName","dFechaFin",1,"form-control","form-control-sm"],[1,"d-flex","justify-content-end","my-4"],["type","button",1,"btn","btn-warning","mx-2",3,"click"],["type","button",1,"btn","btn-primary","mx-2",3,"click"],["class","table-responsive my-5",4,"ngIf"],[1,"table-responsive","my-5"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"],[1,"text-end"]],template:function(e,n){1&e&&(o._uU(0,"\n"),o.TgZ(1,"nav",0),o._uU(2,"\n  "),o.TgZ(3,"ol",1),o._uU(4,"\n    "),o.TgZ(5,"li",2)(6,"a",3),o._uU(7,"Compras"),o.qZA()(),o._uU(8,"\n    "),o.TgZ(9,"li",4),o._uU(10,"Consultas de compras"),o.qZA(),o._uU(11,"\n  "),o.qZA(),o._uU(12,"\n"),o.qZA(),o._uU(13,"\n\n"),o._uU(14,"\n"),o.TgZ(15,"div",5),o._uU(16,"\n  "),o.TgZ(17,"div",6),o._uU(18,"\n    "),o.TgZ(19,"div",7),o._uU(20,"\n      "),o.TgZ(21,"div",8),o._uU(22,"\n        "),o.TgZ(23,"h6",9),o._uU(24,"Formulario de consultas de compras"),o.qZA(),o._uU(25,"\n          "),o.TgZ(26,"form",10),o._uU(27,"\n\n\n\n            "),o.TgZ(28,"div",11),o._uU(29,"\n              "),o.TgZ(30,"div",12),o._uU(31,"\n\n                "),o.TgZ(32,"div",5),o._uU(33,"\n\n                  "),o.TgZ(34,"label",13),o._uU(35,"Tipo de compra"),o.qZA(),o._uU(36,"\n                  "),o.TgZ(37,"div",14),o._uU(38,"\n                    "),o.TgZ(39,"div",15),o._uU(40,"\n                      "),o.TgZ(41,"select",16),o._uU(42,"\n                        "),o.TgZ(43,"option",17),o._uU(44,"Todas"),o.qZA(),o._uU(45,"\n                        "),o.TgZ(46,"option",18),o._uU(47,"Nacional"),o.qZA(),o._uU(48,"\n                        "),o.TgZ(49,"option",19),o._uU(50,"Importada"),o.qZA(),o._uU(51,"\n                      "),o.qZA(),o._uU(52,"\n                    "),o.qZA(),o._uU(53,"\n                  "),o.qZA(),o._uU(54,"\n\n                  "),o.TgZ(55,"label",13),o._uU(56,"Folio"),o.qZA(),o._uU(57,"\n                  "),o.TgZ(58,"div",14),o._uU(59,"\n                    "),o.TgZ(60,"div",15),o._uU(61,"\n                      "),o._UZ(62,"input",20),o._uU(63,"\n                    "),o.qZA(),o._uU(64,"\n                  "),o.qZA(),o._uU(65,"\n\n                  "),o.TgZ(66,"label",13),o._uU(67,"Empresa"),o.qZA(),o._uU(68,"\n                  "),o.TgZ(69,"div",14),o._uU(70,"\n                    "),o.TgZ(71,"div",15),o._uU(72,"\n                      "),o._UZ(73,"input",21),o._uU(74,"\n                      "),o.TgZ(75,"span",22),o._uU(76,"\n                        "),o.TgZ(77,"i",23),o.NdJ("click",function(){return n.openModalEmpresas()}),o.qZA(),o._uU(78,"\n                      "),o.qZA(),o._uU(79,"\n                    "),o.qZA(),o._uU(80,"\n                  "),o.qZA(),o._uU(81,"\n\n                  "),o.TgZ(82,"label",13),o._uU(83,"Proveedor"),o.qZA(),o._uU(84,"\n                  "),o.TgZ(85,"div",14),o._uU(86,"\n                    "),o.TgZ(87,"div",15),o._uU(88,"\n                      "),o._UZ(89,"input",24),o._uU(90,"\n                      "),o.TgZ(91,"span",22),o._uU(92,"\n                        "),o.TgZ(93,"i",23),o.NdJ("click",function(){return n.openModalProveedores()}),o.qZA(),o._uU(94,"\n                      "),o.qZA(),o._uU(95,"\n                    "),o.qZA(),o._uU(96,"\n                  "),o.qZA(),o._uU(97,"\n\n                  "),o.TgZ(98,"label",13),o._uU(99,"Almacen"),o.qZA(),o._uU(100,"\n                  "),o.TgZ(101,"div",14),o._uU(102,"\n                    "),o.TgZ(103,"div",15),o._uU(104,"\n                      "),o._UZ(105,"input",25),o._uU(106,"\n                      "),o.TgZ(107,"span",22),o._uU(108,"\n                        "),o.TgZ(109,"i",23),o.NdJ("click",function(){return n.openModalAlmacenes()}),o.qZA(),o._uU(110,"\n                      "),o.qZA(),o._uU(111,"\n                    "),o.qZA(),o._uU(112,"\n                  "),o.qZA(),o._uU(113,"\n\n                  "),o.TgZ(114,"label",13),o._uU(115,"Articulo"),o.qZA(),o._uU(116,"\n                  "),o.TgZ(117,"div",14),o._uU(118,"\n                    "),o.TgZ(119,"div",15),o._uU(120,"\n                      "),o._UZ(121,"input",26),o._uU(122,"\n                      "),o.TgZ(123,"span",22),o._uU(124,"\n                        "),o.TgZ(125,"i",23),o.NdJ("click",function(){return n.openModalArticulos()}),o.qZA(),o._uU(126,"\n                      "),o.qZA(),o._uU(127,"\n                    "),o.qZA(),o._uU(128,"\n                  "),o.qZA(),o._uU(129,"\n                "),o.qZA(),o._uU(130,"\n              "),o.qZA(),o._uU(131,"\n\n              "),o._UZ(132,"div",27),o._uU(133,"\n\n              "),o.TgZ(134,"div",12),o._uU(135,"\n\n                "),o.TgZ(136,"div",11),o._uU(137,"\n                  "),o.TgZ(138,"label",13),o._uU(139,"Desde"),o.qZA(),o._uU(140,"\n                  "),o.TgZ(141,"div",14),o._uU(142,"\n                    "),o._UZ(143,"input",28),o._uU(144,"\n                  "),o.qZA(),o._uU(145,"\n                  "),o.TgZ(146,"label",13),o._uU(147,"Hasta"),o.qZA(),o._uU(148,"\n                  "),o.TgZ(149,"div",14),o._uU(150,"\n                    "),o._UZ(151,"input",29),o._uU(152,"\n                  "),o.qZA(),o._uU(153,"\n\n                "),o.qZA(),o._uU(154,"\n              "),o.qZA(),o._uU(155,"\n            "),o.qZA(),o._uU(156,"\n\n          "),o.qZA(),o._uU(157,"\n\n          "),o.TgZ(158,"div",30),o._uU(159,"\n            "),o.TgZ(160,"button",31),o.NdJ("click",function(){return n.limpiar()}),o._uU(161,"Limpiar"),o.qZA(),o._uU(162,"\n\n              "),o.TgZ(163,"button",32),o.NdJ("click",function(){return n.consultar()}),o._uU(164,"Consultar"),o.qZA(),o._uU(165,"\n          "),o.qZA(),o._uU(166,"\n\n          "),o.YNc(167,I,64,1,"div",33),o._uU(168,"\n\n\n    "),o.qZA(),o._uU(169,"\n  "),o.qZA(),o._uU(170,"\n"),o.qZA(),o._uU(171,"\n"),o.qZA()),2&e&&(o.xp6(26),o.Q6J("formGroup",n.form),o.xp6(141),o.Q6J("ngIf",n.compras.length>0))},directives:[v.yS,t._Y,t.JL,t.sg,t.EJ,t.JJ,t.u,t.YN,t.Kr,t.wV,t.Fj,r.O5,r.sg],pipes:[r.JJ],styles:[""]}),d})();var O=a(5835);const y=[{path:"",component:N}];let M=(()=>{class d{}return d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=o.oAB({type:d}),d.\u0275inj=o.cJS({imports:[[r.ez,v.Bz.forChild(y),g.m,O.zh,q.ef]]}),d})()},2111:(b,f,a)=>{a.d(f,{N:()=>_});var r=a(2340),v=a(4893),g=a(520);let _=(()=>{class t{constructor(o){this.http=o,this.urlArticulos="catalogos/articulos",this.baseUrl=r.N.api}obtenerArticulos(o,m){return this.http.get(this.baseUrl+this.urlArticulos+"/"+o+"/"+m)}guardarArticulo(o){return this.http.post(this.baseUrl+this.urlArticulos,o)}cancelarArticulo(o){return this.http.delete(this.baseUrl+this.urlArticulos+"/"+o)}}return t.\u0275fac=function(o){return new(o||t)(v.LFG(g.eN))},t.\u0275prov=v.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},5382:(b,f,a)=>{a.d(f,{P:()=>_});var r=a(2340),v=a(4893),g=a(520);let _=(()=>{class t{constructor(o){this.http=o,this.urlEmpresas="catalogos/empresas",this.baseUrl=r.N.api}obtenerEmpresas(o){return this.http.get(this.baseUrl+this.urlEmpresas+"/"+o)}guardarEmpresa(o){return this.http.post(this.baseUrl+this.urlEmpresas,o)}eliminarEmpresa(o){return this.http.delete(this.baseUrl+this.urlEmpresas+"/"+o)}}return t.\u0275fac=function(o){return new(o||t)(v.LFG(g.eN))},t.\u0275prov=v.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},5861:(b,f,a)=>{function r(g,_,t,h,o,m,U){try{var l=g[m](U),u=l.value}catch(A){return void t(A)}l.done?_(u):Promise.resolve(u).then(h,o)}function v(g){return function(){var _=this,t=arguments;return new Promise(function(h,o){var m=g.apply(_,t);function U(u){r(m,h,o,U,l,"next",u)}function l(u){r(m,h,o,U,l,"throw",u)}U(void 0)})}}a.d(f,{Z:()=>v})}}]);