var fonts = {
  Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
const getStream = require('get-stream');
const { numberWithSeparators } = require('../../helpers/funciones');
async function generarPdf(docDefinition) {

  try {
      var pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.end();
      let result = await getStream.buffer(pdfDoc);
      result = result.toString('base64');
      return result;
  } catch (err) {
      console.log(err);
      return null;
  }

}

async function obtenerTicketVenta(params, t) {
console.log('entro');
  let info = params.result;

  try {

     let colorCotizacion = '#a9b595';
     let articulos = [{
        nArticulo:1,
        cArticulo: 'DIESEL JGL',
        nCantidadArticulo: 5000,
        nPrecioArticulo: 14.50,
        nDescuentoArticulo:0,
        nTotal: 10000

     }]
      var docDefinition = {
          pageSize: 'LETTER',
          pageMargins: [20, 80, 20, 20],
          pageOrientation: 'landscape',
          // header: [
          //     {
          //         image: './images/logos/spazio-WEB.png',
          //         width: 150,
          //         height: 60,
          //         margin: [13, 10, 0, 0]
          //     },
          //     // {
          //     //     text: 'COTIZACIÓN',
          //     //     margin: [500, 25, 0, 0],
          //     //     // alignment: 'center'
          //     // }
          // ],
          header: {
              columns: [{
                      image: './images/logos/logo-empresa.png',
                      width: 150,
                      height: 60,
                      margin: [13, 10, 0, 0]
                  },
                  {
                      text: 'COTIZACIÓN',
                      fontSize: 14,
                      bold: true,
                      margin: [230, 30, 0, 0]
                  }
              ]
          },
          footer: function(currentPage, pageCount) { return { 'text': 'Página ' + currentPage.toString() + ' de ' + pageCount, 'margin': [0, 0, 20, 0], 'alignment': 'right' }; },
          defaultStyle: {
              fontSize: 10
          },
          content: [{
                  stack: [
                      { text: 'JRM TRANSPORTACION DE HIDROCARBUROS' || '' },
                      { text: `${('PLAN MAR DE CORTÉS #1697 ENTRE ALVARO OBREGÓN Y AV. PATRIA' || '')} CP. ${'80300' || ''}, Col. ${'CONOCIDA' || ''}, ${'CULIACAN' || ''}.` },
              
                      {
                          columns: [{
                              width: 60,
                              text: 'Teléfono:'
                          }, {
                              width: '*',
                              text: '6673721244' || ''
                          }]
                      },
                      {
                          columns: [{
                                  width: 60,
                                  text: 'Folio:'
                              }, {
                                  width: '*',
                                  text: '123'
                              },
                              {
                                  width: 60,
                                  text: 'Estatus:'
                              },
                              {
                                  width: 200,
                                  text: 'PENDIENTE'
                              }
                          ]
                      },
                      {
                          columns: [{
                                  width: 60,
                                  text: 'Cliente:'
                              }, {
                                  width: '*',
                                  text: 'CORRALES SANTA CECILIA, S.A DE C.V.' || ''
                              },
                              {
                                  width: 60,
                                  text: 'Sucursal:'
                              },
                              {
                                  width: 200,
                                  text: 'JRM TRANSPORTACION DE HIDROCARBUROS' || ''
                              }
                          ]
                      },
                      {
                          columns: [{
                              width: 60,
                              text: 'Vendedor:'
                          }, {
                              width: '*',
                              text: 'JOSE MANUEL TOSTADO GRANADOS' || ''
                          }]
                      },

                  ],
                  style: 'info',
              }, {
                  canvas: [{
                      type: 'rect',
                      x: 0,
                      y: -80,
                      w: 752,
                      h: 80,
                      lineWidth: 1,
                      lineColor: '#a9b595',
                  }, ]
              },
              {
                  style: 'table',
                  table: {
                      widths: [40, '*', 42, 75, 60, 75, 60, 75],
                      headerRows: 1,
                      dontBreakRows: true,
                      // keepWithHeaderRows: 1,
                      body: [
                          [{ text: 'Folio', style: 'tableHeader', alignment: 'center' },
                              { text: 'Descripción', style: 'tableHeader', alignment: 'center' },
                              { text: 'Cantidad', style: 'tableHeader', alignment: 'center' },
                              { text: 'Precio', style: 'tableHeader', alignment: 'center' },
                              { text: 'Descuento \n%', style: 'tableHeader', alignment: 'center' },
                              { text: 'Descuento \n$', style: 'tableHeader', alignment: 'center' },
                              { text: 'Imagen', style: 'tableHeader', alignment: 'center' },
                              { text: 'Total', style: 'tableHeader', alignment: 'center' },
                          ],

                          ...articulos.map(function(articulo, index) {
                              let renglon = [];
                              renglon = [{ text: articulo.nArticulo, style: 'tableRow', alignment: 'center' },
                                  { text: articulo.cArticulo, style: 'tableRow', alignment: 'center' },
                                  { text: articulo.nCantidadArticulo, style: 'tableRow', alignment: 'right' },
                                  {
                                      columns: [{
                                          width: 10,
                                          text: '$'
                                      }, {
                                          width: 65,
                                          text: numberWithSeparators(articulo.nPrecioArticulo),
                                          alignment: 'right'
                                      }],
                                      style: 'tableRow'
                                  },

                                  //{ text:articulo.nPrecio, style: 'tableRow', alignment: 'center' },
                                  { text: 0 + '%', style: 'tableRow', alignment: 'right' },
                                  {
                                      columns: [{
                                          width: 10,
                                          text: '$'
                                      }, {
                                          width: 65,
                                          text: numberWithSeparators(articulo.nDescuentoArticulo),
                                          alignment: 'right'
                                      }],
                                      style: 'tableRow'
                                  },
                                  //{ text: articulo.nDescuento, style: 'tableRow', alignment: 'center' },
                                  articulo.cImagen ? {
                                      image: articulo.cImagen,
                                      fit: [50, 60],
                                      style: 'tableRow',
                                      alignment: 'center'
                                  } : {},
                                  {
                                      columns: [{
                                          width: 10,
                                          text: '$'
                                      }, {
                                          width: 65,
                                          text: numberWithSeparators(articulo.nImporteArticulo),
                                          alignment: 'right'
                                      }],
                                      style: 'tableRow'
                                  }
                              ];
                              return renglon;
                          }), [{ text: 'Total', style: 'tableTotal', alignment: 'right', colSpan: 5 },
                              {}, {}, {}, {},
                              {
                                  columns: [{
                                      width: 10,
                                      text: '$'
                                  }, {
                                      width: 65,
                                      text: numberWithSeparators(0),
                                      alignment: 'right'
                                  }],
                                  style: 'tableTotal'
                              },
                              {},
                              {
                                  columns: [{
                                      width: 10,
                                      text: '$'
                                  }, {
                                      width: 65,
                                      text: numberWithSeparators(0),
                                      alignment: 'right'
                                  }],
                                  style: 'tableTotal'
                              },
                          ],
                      ]
                  },
                  layout: {
                      hLineWidth: function(i, node) {
                          return 1;
                      },
                      vLineWidth: function(i, node) {
                          return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                      },
                      hLineColor: function(i, node) {
                          return (i === 0 || i === node.table.body.length) ? colorCotizacion : (i === 1 ? '#a9b595' : '#efefef');
                      },
                      vLineColor: function(i, node) {
                          return (i === 0 || i === node.table.widths.length) ? colorCotizacion : '#efefef';
                      },
                  }

              },
          ],
          styles: {
              info: {
                  margin: [5, 5, 5, 5]
              },
              table: {
                  margin: [0, 10, 0, 10]
              },
              tableHeader: {
                  color: 'white',
                  bold: true,
                  fillColor: '#a9b595',
              }
          }
      };
      console.log(docDefinition);

      let data = await generarPdf(docDefinition);

      return {
        status: 200,
        data: { 'pdf': 'data:application/pdf;filename=cotizacion.pdf;base64,' + data }
    };
      

  } catch (err) {
    console.log(err);
      return {
          status: 500,
          data: null,
      };
  }
}



module.exports = {
    obtenerTicketVenta
};
