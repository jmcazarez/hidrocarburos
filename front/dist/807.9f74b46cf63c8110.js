"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[807],{7807:(y,u,o)=>{o.r(u),o.d(u,{DashboardModule:()=>A});var l=o(9808),d=o(9560),_=o(5886),n=o(4893),i=o(257),p=o(5701),c=o(6041);const f=[{path:"",component:(()=>{class e{constructor(r){this.calendar=r,this.customersChartOptions={},this.ordersChartOptions={},this.growthChartOptions={},this.revenueChartOptions={},this.monthlySalesChartOptions={},this.cloudStorageChartOptions={},this.obj={primary:"#6571ff",secondary:"#7987a1",success:"#05a34a",info:"#66d1d1",warning:"#fbbc06",danger:"#ff3366",light:"#e9ecef",dark:"#060c17",muted:"#7987a1",gridBorder:"rgba(77, 138, 240, .15)",bodyColor:"#000",cardBg:"#fff",fontFamily:"'Roboto', Helvetica, sans-serif"}}ngOnInit(){var r;this.currentDate=this.calendar.getToday(),this.customersChartOptions=function Z(e){return{series:[{name:"",data:[3844,3855,3841,3867,3822,3843,3821,3841,3856,3827,3843]}],chart:{type:"line",height:60,sparkline:{enabled:!0}},colors:[e.primary],xaxis:{type:"datetime",categories:["Jan 01 2022","Jan 02 2022","Jan 03 2022","Jan 04 2022","Jan 05 2022","Jan 06 2022","Jan 07 2022","Jan 08 2022","Jan 09 2022","Jan 10 2022","Jan 11 2022"]},stroke:{width:2,curve:"smooth"},markers:{size:0}}}(this.obj),this.ordersChartOptions=function g(e){return{series:[{name:"",data:[36,77,52,90,74,35,55,23,47,10,63]}],chart:{type:"bar",height:60,sparkline:{enabled:!0}},colors:[e.primary],plotOptions:{bar:{borderRadius:2,columnWidth:"60%"}},xaxis:{type:"datetime",categories:["Jan 01 2022","Jan 02 2022","Jan 03 2022","Jan 04 2022","Jan 05 2022","Jan 06 2022","Jan 07 2022","Jan 08 2022","Jan 09 2022","Jan 10 2022","Jan 11 2022"]}}}(this.obj),this.growthChartOptions=function h(e){return{series:[{name:"",data:[41,45,44,46,52,54,43,74,82,82,89]}],chart:{type:"line",height:60,sparkline:{enabled:!0}},colors:[e.primary],xaxis:{type:"datetime",categories:["Jan 01 2022","Jan 02 2022","Jan 03 2022","Jan 04 2022","Jan 05 2022","Jan 06 2022","Jan 07 2022","Jan 08 2022","Jan 09 2022","Jan 10 2022","Jan 11 2022"]},stroke:{width:2,curve:"smooth"},markers:{size:0}}}(this.obj),this.revenueChartOptions=function m(e){return{series:[{name:"Niveles",data:[49.3,48.7,50.6,53.3,54.7,53.8,54.6,56.7,56.9,56.1,56.5,60.3,58.7,61.4,61.1,58.5,54.7,52,51,47.4,48.5,48.9,53.5,50.2,46.2,48.6,51.7,51.3,50.2,54.6,52.4,53,57,52.9,48.7,52.6,53.5,58.5,55.1,58,61.3,57.7,60.2,61,57.7,56.8,58.9,62.4,58.7,58.4,56.7,52.7,52.3,50.5,55.4,50.4,52.4,48.7,47.4,43.3,38.9,34.7,31,32.6,36.8,35.8,32.7,33.2,30.8,28.6,28.4,27.7,27.7,25.9,24.3,21.9,22,23.5,27.3,30.2,27.2,29.9,25.1,23,23.7,23.4,27.9,23.2,23.9,19.2,15.1,15,11,9.2,7.47,11.6,15.7,13.9,12.5,13.5,15,13.9,13.2,18.1,20.6,21,25.3,25.3,20.9,18.7,15.3,14.5,17.9,15.9,16.3,14.1,12.1,14.8,17.2,17.7,14,18.6,18.4,22.6,25,28.1,28,24.1,24.2,28.2,26.2,29.3,26,23.9,28.8,25.1,21.7,23,20.7,29.7,30.2,32.5,31.4,33.6,30,34.2,36.9,35.5,34.7,36.9]}],chart:{type:"line",height:"400",parentHeightOffset:0,foreColor:e.bodyColor,background:e.cardBg,toolbar:{show:!1}},colors:[e.primary,e.danger,e.warning],grid:{padding:{bottom:-4},borderColor:e.gridBorder,xaxis:{lines:{show:!0}}},xaxis:{type:"datetime",categories:["Jan 01 2022","Jan 02 2022","jan 03 2022","Jan 04 2022","Jan 05 2022","Jan 06 2022","Jan 07 2022","Jan 08 2022","Jan 09 2022","Jan 10 2022","Jan 11 2022","Jan 12 2022","Jan 13 2022","Jan 14 2022","Jan 15 2022","Jan 16 2022","Jan 17 2022","Jan 18 2022","Jan 19 2022","Jan 20 2022","Jan 21 2022","Jan 22 2022","Jan 23 2022","Jan 24 2022","Jan 25 2022","Jan 26 2022","Jan 27 2022","Jan 28 2022","Jan 29 2022","Jan 30 2022","Jan 31 2022","Feb 01 2022","Feb 02 2022","Feb 03 2022","Feb 04 2022","Feb 05 2022","Feb 06 2022","Feb 07 2022","Feb 08 2022","Feb 09 2022","Feb 10 2022","Feb 11 2022","Feb 12 2022","Feb 13 2022","Feb 14 2022","Feb 15 2022","Feb 16 2022","Feb 17 2022","Feb 18 2022","Feb 19 2022","Feb 20 2022","Feb 21 2022","Feb 22 2022","Feb 23 2022","Feb 24 2022","Feb 25 2022","Feb 26 2022","Feb 27 2022","Feb 28 2022","Mar 01 2022","Mar 02 2022","Mar 03 2022","Mar 04 2022","Mar 05 2022","Mar 06 2022","Mar 07 2022","Mar 08 2022","Mar 09 2022","Mar 10 2022","Mar 11 2022","Mar 12 2022","Mar 13 2022","Mar 14 2022","Mar 15 2022","Mar 16 2022","Mar 17 2022","Mar 18 2022","Mar 19 2022","Mar 20 2022","Mar 21 2022","Mar 22 2022","Mar 23 2022","Mar 24 2022","Mar 25 2022","Mar 26 2022","Mar 27 2022","Mar 28 2022","Mar 29 2022","Mar 30 2022","Mar 31 2022","Apr 01 2022","Apr 02 2022","Apr 03 2022","Apr 04 2022","Apr 05 2022","Apr 06 2022","Apr 07 2022","Apr 08 2022","Apr 09 2022","Apr 10 2022","Apr 11 2022","Apr 12 2022","Apr 13 2022","Apr 14 2022","Apr 15 2022","Apr 16 2022","Apr 17 2022","Apr 18 2022","Apr 19 2022","Apr 20 2022","Apr 21 2022","Apr 22 2022","Apr 23 2022","Apr 24 2022","Apr 25 2022","Apr 26 2022","Apr 27 2022","Apr 28 2022","Apr 29 2022","Apr 30 2022","May 01 2022","May 02 2022","May 03 2022","May 04 2022","May 05 2022","May 06 2022","May 07 2022","May 08 2022","May 09 2022","May 10 2022","May 11 2022","May 12 2022","May 13 2022","May 14 2022","May 15 2022","May 16 2022","May 17 2022","May 18 2022","May 19 2022","May 20 2022","May 21 2022","May 22 2022","May 23 2022","May 24 2022","May 25 2022","May 26 2022","May 27 2022","May 28 2022","May 29 2022","May 30 2022"],lines:{show:!0},axisBorder:{color:e.gridBorder},axisTicks:{color:e.gridBorder},crosshairs:{stroke:{color:e.secondary}}},yaxis:{title:{text:"Niveles",style:{size:9,color:e.muted}},tickAmount:4,tooltip:{enabled:!0},crosshairs:{stroke:{color:e.secondary}},labels:{offsetX:0}},markers:{size:0},stroke:{width:2,curve:"straight"}}}(this.obj),this.monthlySalesChartOptions=function b(e){return{series:[{name:"Sales",data:[152,109,93,113,126,161,188,143,102,113,116,124]}],chart:{type:"bar",height:"318",parentHeightOffset:0,foreColor:e.bodyColor,background:e.cardBg,toolbar:{show:!1}},colors:[e.primary],fill:{opacity:.9},grid:{padding:{bottom:-4},borderColor:e.gridBorder,xaxis:{lines:{show:!0}}},xaxis:{type:"datetime",categories:["01/01/2022","02/01/2022","03/01/2022","04/01/2022","05/01/2022","06/01/2022","07/01/2022","08/01/2022","09/01/2022","10/01/2022","11/01/2022","12/01/2022"],axisBorder:{color:e.gridBorder},axisTicks:{color:e.gridBorder}},yaxis:{title:{text:"Number of Sales",style:{size:9,color:e.muted}},labels:{offsetX:0}},legend:{show:!0,position:"top",horizontalAlign:"center",fontFamily:e.fontFamily,itemMargin:{horizontal:8,vertical:0}},stroke:{width:0},dataLabels:{enabled:!0,style:{fontSize:"10px",fontFamily:e.fontFamily},offsetY:-27},plotOptions:{bar:{columnWidth:"50%",borderRadius:4,dataLabels:{position:"top",orientation:"vertical"}}}}}(this.obj),this.cloudStorageChartOptions=function T(e){return{series:[67],chart:{height:260,type:"radialBar"},colors:[e.primary],plotOptions:{radialBar:{hollow:{margin:15,size:"70%"},track:{show:!0,background:e.light,strokeWidth:"100%",opacity:1,margin:5},dataLabels:{showOn:"always",name:{offsetY:-11,show:!0,color:e.muted,fontSize:"13px"},value:{color:e.bodyColor,fontSize:"30px",show:!0}}}},fill:{opacity:1},stroke:{lineCap:"round"},labels:["Storage Used"]}}(this.obj),"rtl"===(null===(r=document.querySelector("html"))||void 0===r?void 0:r.getAttribute("dir"))&&this.addRtlOptions()}addRtlOptions(){this.revenueChartOptions.yaxis.labels.offsetX=-25,this.revenueChartOptions.yaxis.title.offsetX=-75,this.monthlySalesChartOptions.yaxis.labels.offsetX=-10,this.monthlySalesChartOptions.yaxis.title.offsetX=-70}}return e.\u0275fac=function(r){return new(r||e)(n.Y36(i.vL))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-dashboard"]],decls:366,vars:25,consts:[[1,"d-flex","justify-content-between","align-items-center","flex-wrap","grid-margin"],[1,"mb-3","mb-md-0"],[1,"d-flex","align-items-center","flex-wrap","text-nowrap"],[1,"row"],[1,"col-12","col-xl-12","stretch-card"],[1,"row","flex-grow-1"],[1,"col-md-4","grid-margin","stretch-card"],[1,"card"],[1,"card-body"],[1,"d-flex","justify-content-between","align-items-baseline"],[1,"card-title","mb-0"],["ngbDropdown","",1,"mb-2"],["ngbDropdownToggle","","type","button","id","dropdownMenuButton",1,"btn","p-0","no-dropdown-toggle-icon"],["data-feather","more-horizontal","appFeatherIcon","",1,"icon-lg","text-muted","pb-3px"],["ngbDropdownMenu","","aria-labelledby","dropdownMenuButton"],["ngbDropdownItem","","href","",1,"d-flex","align-items-center",3,"click"],["data-feather","eye","appFeatherIcon","",1,"icon-sm","me-2"],[1,""],["data-feather","edit-2","appFeatherIcon","",1,"icon-sm","me-2"],["data-feather","trash","appFeatherIcon","",1,"icon-sm","me-2"],["data-feather","printer","appFeatherIcon","",1,"icon-sm","me-2"],["data-feather","download","appFeatherIcon","",1,"icon-sm","me-2"],[1,"col-6","col-md-12","col-xl-5"],[1,"mb-2"],[1,"d-flex","align-items-baseline"],[1,"text-success"],["data-feather","arrow-up","appFeatherIcon","",1,"icon-sm","mb-1"],[1,"col-6","col-md-12","col-xl-7"],[1,"mt-md-3","mt-xl-0"],[3,"series","chart","colors","xaxis","stroke","markers"],["ngbDropdownToggle","","type","button","id","dropdownMenuButton1",1,"btn","p-0","no-dropdown-toggle-icon"],["ngbDropdownMenu","","aria-labelledby","dropdownMenuButton1"],[1,"text-danger"],["data-feather","arrow-down","appFeatherIcon","",1,"icon-sm","mb-1"],[3,"series","chart","colors","plotOptions","xaxis"],["ngbDropdownToggle","","type","button","id","dropdownMenuButton2",1,"btn","p-0","no-dropdown-toggle-icon"],["ngbDropdownMenu","","aria-labelledby","dropdownMenuButton2"],[1,"col-12","col-xl-12","grid-margin","stretch-card"],[1,"card","overflow-hidden"],[1,"d-flex","justify-content-between","align-items-baseline","mb-4","mb-md-3"],["ngbDropdown",""],["ngbDropdownToggle","","type","button","id","dropdownMenuButton3",1,"btn","p-0","no-dropdown-toggle-icon"],["ngbDropdownMenu","","aria-labelledby","dropdownMenuButton3"],[1,"row","align-items-start"],[1,"col-md-7"],[1,"text-muted","tx-13","mb-3","mb-md-0"],[1,"col-md-5","d-flex","justify-content-md-end"],["role","group","aria-label","Basic example",1,"btn-group","mb-3","mb-md-0"],["type","button",1,"btn","btn-outline-primary"],["type","button",1,"btn","btn-outline-primary","d-none","d-md-block"],["type","button",1,"btn","btn-primary"],[1,"flot-wrapper"],[3,"series","chart","colors","grid","xaxis","yaxis","markers","stroke"]],template:function(r,a){1&r&&(n.TgZ(0,"div",0),n._uU(1,"\n  "),n.TgZ(2,"div"),n._uU(3,"\n    "),n.TgZ(4,"h4",1),n._uU(5,"Tablero de Indicadores"),n.qZA(),n._uU(6,"\n  "),n.qZA(),n._uU(7,"\n  "),n.TgZ(8,"div",2),n._uU(9,"\n  \n  "),n.qZA(),n._uU(10,"\n"),n.qZA(),n._uU(11,"\n\n"),n.TgZ(12,"div",3),n._uU(13,"\n  "),n.TgZ(14,"div",4),n._uU(15,"\n    "),n.TgZ(16,"div",5),n._uU(17,"\n      "),n.TgZ(18,"div",6),n._uU(19,"\n        "),n.TgZ(20,"div",7),n._uU(21,"\n          "),n.TgZ(22,"div",8),n._uU(23,"\n            "),n.TgZ(24,"div",9),n._uU(25,"\n              "),n.TgZ(26,"h6",10),n._uU(27,"Compras"),n.qZA(),n._uU(28,"\n              "),n.TgZ(29,"div",11),n._uU(30,"\n                "),n.TgZ(31,"button",12),n._uU(32,"\n                  "),n._UZ(33,"i",13),n._uU(34,"\n                "),n.qZA(),n._uU(35,"\n                "),n.TgZ(36,"div",14),n._uU(37,"\n                  "),n.TgZ(38,"a",15),n.NdJ("click",function(){return!1}),n._UZ(39,"i",16),n._uU(40," "),n.TgZ(41,"span",17),n._uU(42,"View"),n.qZA()(),n._uU(43,"\n                  "),n.TgZ(44,"a",15),n.NdJ("click",function(){return!1}),n._UZ(45,"i",18),n._uU(46," "),n.TgZ(47,"span",17),n._uU(48,"Edit"),n.qZA()(),n._uU(49,"\n                  "),n.TgZ(50,"a",15),n.NdJ("click",function(){return!1}),n._UZ(51,"i",19),n._uU(52," "),n.TgZ(53,"span",17),n._uU(54,"Delete"),n.qZA()(),n._uU(55,"\n                  "),n.TgZ(56,"a",15),n.NdJ("click",function(){return!1}),n._UZ(57,"i",20),n._uU(58," "),n.TgZ(59,"span",17),n._uU(60,"Print"),n.qZA()(),n._uU(61,"\n                  "),n.TgZ(62,"a",15),n.NdJ("click",function(){return!1}),n._UZ(63,"i",21),n._uU(64," "),n.TgZ(65,"span",17),n._uU(66,"Download"),n.qZA()(),n._uU(67,"\n                "),n.qZA(),n._uU(68,"\n              "),n.qZA(),n._uU(69,"\n            "),n.qZA(),n._uU(70,"\n            "),n.TgZ(71,"div",3),n._uU(72,"\n              "),n.TgZ(73,"div",22),n._uU(74,"\n                "),n.TgZ(75,"h3",23),n._uU(76,"3,897"),n.qZA(),n._uU(77,"\n                "),n.TgZ(78,"div",24),n._uU(79,"\n                  "),n.TgZ(80,"p",25),n._uU(81,"\n                    "),n.TgZ(82,"span"),n._uU(83,"+3.3%"),n.qZA(),n._uU(84,"\n                    "),n._UZ(85,"i",26),n._uU(86,"\n                  "),n.qZA(),n._uU(87,"\n                "),n.qZA(),n._uU(88,"\n              "),n.qZA(),n._uU(89,"\n              "),n.TgZ(90,"div",27),n._uU(91,"\n                "),n.TgZ(92,"div",28),n._uU(93,"\n                  "),n._UZ(94,"apx-chart",29),n._uU(95,"\n                "),n.qZA(),n._uU(96,"\n              "),n.qZA(),n._uU(97,"\n            "),n.qZA(),n._uU(98,"\n          "),n.qZA(),n._uU(99,"\n        "),n.qZA(),n._uU(100,"\n      "),n.qZA(),n._uU(101,"\n      "),n.TgZ(102,"div",6),n._uU(103,"\n        "),n.TgZ(104,"div",7),n._uU(105,"\n          "),n.TgZ(106,"div",8),n._uU(107,"\n            "),n.TgZ(108,"div",9),n._uU(109,"\n              "),n.TgZ(110,"h6",10),n._uU(111,"Ventas"),n.qZA(),n._uU(112,"\n              "),n.TgZ(113,"div",11),n._uU(114,"\n                "),n.TgZ(115,"button",30),n._uU(116,"\n                  "),n._UZ(117,"i",13),n._uU(118,"\n                "),n.qZA(),n._uU(119,"\n                "),n.TgZ(120,"div",31),n._uU(121,"\n                  "),n.TgZ(122,"a",15),n.NdJ("click",function(){return!1}),n._UZ(123,"i",16),n._uU(124," "),n.TgZ(125,"span",17),n._uU(126,"View"),n.qZA()(),n._uU(127,"\n                  "),n.TgZ(128,"a",15),n.NdJ("click",function(){return!1}),n._UZ(129,"i",18),n._uU(130," "),n.TgZ(131,"span",17),n._uU(132,"Edit"),n.qZA()(),n._uU(133,"\n                  "),n.TgZ(134,"a",15),n.NdJ("click",function(){return!1}),n._UZ(135,"i",19),n._uU(136," "),n.TgZ(137,"span",17),n._uU(138,"Delete"),n.qZA()(),n._uU(139,"\n                  "),n.TgZ(140,"a",15),n.NdJ("click",function(){return!1}),n._UZ(141,"i",20),n._uU(142," "),n.TgZ(143,"span",17),n._uU(144,"Print"),n.qZA()(),n._uU(145,"\n                  "),n.TgZ(146,"a",15),n.NdJ("click",function(){return!1}),n._UZ(147,"i",21),n._uU(148," "),n.TgZ(149,"span",17),n._uU(150,"Download"),n.qZA()(),n._uU(151,"\n                "),n.qZA(),n._uU(152,"\n              "),n.qZA(),n._uU(153,"\n            "),n.qZA(),n._uU(154,"\n            "),n.TgZ(155,"div",3),n._uU(156,"\n              "),n.TgZ(157,"div",22),n._uU(158,"\n                "),n.TgZ(159,"h3",23),n._uU(160,"35,084"),n.qZA(),n._uU(161,"\n                "),n.TgZ(162,"div",24),n._uU(163,"\n                  "),n.TgZ(164,"p",32),n._uU(165,"\n                    "),n.TgZ(166,"span"),n._uU(167,"-2.8%"),n.qZA(),n._uU(168,"\n                    "),n._UZ(169,"i",33),n._uU(170,"\n                  "),n.qZA(),n._uU(171,"\n                "),n.qZA(),n._uU(172,"\n              "),n.qZA(),n._uU(173,"\n              "),n.TgZ(174,"div",27),n._uU(175,"\n                "),n.TgZ(176,"div",28),n._uU(177,"\n                  "),n._UZ(178,"apx-chart",34),n._uU(179,"\n                "),n.qZA(),n._uU(180,"\n              "),n.qZA(),n._uU(181,"\n            "),n.qZA(),n._uU(182,"\n          "),n.qZA(),n._uU(183,"\n        "),n.qZA(),n._uU(184,"\n      "),n.qZA(),n._uU(185,"\n      "),n.TgZ(186,"div",6),n._uU(187,"\n        "),n.TgZ(188,"div",7),n._uU(189,"\n          "),n.TgZ(190,"div",8),n._uU(191,"\n            "),n.TgZ(192,"div",9),n._uU(193,"\n              "),n.TgZ(194,"h6",10),n._uU(195,"Precio Dolar"),n.qZA(),n._uU(196,"\n              "),n.TgZ(197,"div",11),n._uU(198,"\n                "),n.TgZ(199,"button",35),n._uU(200,"\n                  "),n._UZ(201,"i",13),n._uU(202,"\n                "),n.qZA(),n._uU(203,"\n                "),n.TgZ(204,"div",36),n._uU(205,"\n                  "),n.TgZ(206,"a",15),n.NdJ("click",function(){return!1}),n._UZ(207,"i",16),n._uU(208," "),n.TgZ(209,"span",17),n._uU(210,"View"),n.qZA()(),n._uU(211,"\n                  "),n.TgZ(212,"a",15),n.NdJ("click",function(){return!1}),n._UZ(213,"i",18),n._uU(214," "),n.TgZ(215,"span",17),n._uU(216,"Edit"),n.qZA()(),n._uU(217,"\n                  "),n.TgZ(218,"a",15),n.NdJ("click",function(){return!1}),n._UZ(219,"i",19),n._uU(220," "),n.TgZ(221,"span",17),n._uU(222,"Delete"),n.qZA()(),n._uU(223,"\n                  "),n.TgZ(224,"a",15),n.NdJ("click",function(){return!1}),n._UZ(225,"i",20),n._uU(226," "),n.TgZ(227,"span",17),n._uU(228,"Print"),n.qZA()(),n._uU(229,"\n                  "),n.TgZ(230,"a",15),n.NdJ("click",function(){return!1}),n._UZ(231,"i",21),n._uU(232," "),n.TgZ(233,"span",17),n._uU(234,"Download"),n.qZA()(),n._uU(235,"\n                "),n.qZA(),n._uU(236,"\n              "),n.qZA(),n._uU(237,"\n            "),n.qZA(),n._uU(238,"\n            "),n.TgZ(239,"div",3),n._uU(240,"\n              "),n.TgZ(241,"div",22),n._uU(242,"\n                "),n.TgZ(243,"h3",23),n._uU(244,"89.87%"),n.qZA(),n._uU(245,"\n                "),n.TgZ(246,"div",24),n._uU(247,"\n                  "),n.TgZ(248,"p",25),n._uU(249,"\n                    "),n.TgZ(250,"span"),n._uU(251,"+2.8%"),n.qZA(),n._uU(252,"\n                    "),n._UZ(253,"i",26),n._uU(254,"\n                  "),n.qZA(),n._uU(255,"\n                "),n.qZA(),n._uU(256,"\n              "),n.qZA(),n._uU(257,"\n              "),n.TgZ(258,"div",27),n._uU(259,"\n                "),n.TgZ(260,"div",28),n._uU(261,"\n                  "),n._UZ(262,"apx-chart",29),n._uU(263,"\n                "),n.qZA(),n._uU(264,"\n              "),n.qZA(),n._uU(265,"\n            "),n.qZA(),n._uU(266,"\n          "),n.qZA(),n._uU(267,"\n        "),n.qZA(),n._uU(268,"\n      "),n.qZA(),n._uU(269,"\n    "),n.qZA(),n._uU(270,"\n  "),n.qZA(),n._uU(271,"\n"),n.qZA(),n._uU(272," "),n._uU(273,"\n\n"),n.TgZ(274,"div",3),n._uU(275,"\n  "),n.TgZ(276,"div",37),n._uU(277,"\n    "),n.TgZ(278,"div",38),n._uU(279,"\n      "),n.TgZ(280,"div",8),n._uU(281,"\n        "),n.TgZ(282,"div",39),n._uU(283,"\n          "),n.TgZ(284,"h6",10),n._uU(285,"Niveles de Tanques"),n.qZA(),n._uU(286,"\n          "),n.TgZ(287,"div",40),n._uU(288,"\n            "),n.TgZ(289,"button",41),n._uU(290,"\n              "),n._UZ(291,"i",13),n._uU(292,"\n            "),n.qZA(),n._uU(293,"\n            "),n.TgZ(294,"div",42),n._uU(295,"\n              "),n.TgZ(296,"a",15),n.NdJ("click",function(){return!1}),n._UZ(297,"i",16),n._uU(298," "),n.TgZ(299,"span",17),n._uU(300,"View"),n.qZA()(),n._uU(301,"\n              "),n.TgZ(302,"a",15),n.NdJ("click",function(){return!1}),n._UZ(303,"i",18),n._uU(304," "),n.TgZ(305,"span",17),n._uU(306,"Edit"),n.qZA()(),n._uU(307,"\n              "),n.TgZ(308,"a",15),n.NdJ("click",function(){return!1}),n._UZ(309,"i",19),n._uU(310," "),n.TgZ(311,"span",17),n._uU(312,"Delete"),n.qZA()(),n._uU(313,"\n              "),n.TgZ(314,"a",15),n.NdJ("click",function(){return!1}),n._UZ(315,"i",20),n._uU(316," "),n.TgZ(317,"span",17),n._uU(318,"Print"),n.qZA()(),n._uU(319,"\n              "),n.TgZ(320,"a",15),n.NdJ("click",function(){return!1}),n._UZ(321,"i",21),n._uU(322," "),n.TgZ(323,"span",17),n._uU(324,"Download"),n.qZA()(),n._uU(325,"\n            "),n.qZA(),n._uU(326,"\n          "),n.qZA(),n._uU(327,"\n        "),n.qZA(),n._uU(328,"\n        "),n.TgZ(329,"div",43),n._uU(330,"\n          "),n.TgZ(331,"div",44),n._uU(332,"\n            "),n.TgZ(333,"p",45),n._uU(334,"Revenue is the income that a business has from its normal business activities, usually from the sale of goods and services to customers."),n.qZA(),n._uU(335,"\n          "),n.qZA(),n._uU(336,"\n          "),n.TgZ(337,"div",46),n._uU(338,"\n            "),n.TgZ(339,"div",47),n._uU(340,"\n              "),n.TgZ(341,"button",48),n._uU(342,"Dia"),n.qZA(),n._uU(343,"\n              "),n.TgZ(344,"button",49),n._uU(345,"Semana"),n.qZA(),n._uU(346,"\n              "),n.TgZ(347,"button",50),n._uU(348,"Mes"),n.qZA(),n._uU(349,"\n              "),n.TgZ(350,"button",48),n._uU(351,"A\xf1o"),n.qZA(),n._uU(352,"\n            "),n.qZA(),n._uU(353,"\n          "),n.qZA(),n._uU(354,"\n        "),n.qZA(),n._uU(355,"\n        "),n.TgZ(356,"div",51),n._uU(357,"\n          "),n._UZ(358,"apx-chart",52),n._uU(359,"\n        "),n.qZA(),n._uU(360,"\n      "),n.qZA(),n._uU(361,"\n    "),n.qZA(),n._uU(362,"\n  "),n.qZA(),n._uU(363,"\n"),n.qZA(),n._uU(364," "),n._uU(365,"\n")),2&r&&(n.xp6(94),n.Q6J("series",a.customersChartOptions.series)("chart",a.customersChartOptions.chart)("colors",a.customersChartOptions.colors)("xaxis",a.customersChartOptions.xaxis)("stroke",a.customersChartOptions.stroke)("markers",a.customersChartOptions.markers),n.xp6(84),n.Q6J("series",a.ordersChartOptions.series)("chart",a.ordersChartOptions.chart)("colors",a.ordersChartOptions.colors)("plotOptions",a.ordersChartOptions.plotOptions)("xaxis",a.ordersChartOptions.xaxis),n.xp6(84),n.Q6J("series",a.growthChartOptions.series)("chart",a.growthChartOptions.chart)("colors",a.growthChartOptions.colors)("xaxis",a.growthChartOptions.xaxis)("stroke",a.growthChartOptions.stroke)("markers",a.growthChartOptions.markers),n.xp6(96),n.Q6J("series",a.revenueChartOptions.series)("chart",a.revenueChartOptions.chart)("colors",a.revenueChartOptions.colors)("grid",a.revenueChartOptions.grid)("xaxis",a.revenueChartOptions.xaxis)("yaxis",a.revenueChartOptions.yaxis)("markers",a.revenueChartOptions.markers)("stroke",a.revenueChartOptions.stroke))},directives:[i.jt,i.iD,p.R,i.Vi,i.TH,c.x],styles:[""]}),e})()}];let A=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[l.ez,d.Bz.forChild(f),_.m]]}),e})()}}]);