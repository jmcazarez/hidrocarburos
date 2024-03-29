import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: '',
    isTitle: true
  },
  {
    label: 'Tablero indicadores',
    icon: 'pie-chart',
    link: '/dashboard'
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Compras',
    icon: 'shopping-bag',
    subItems: [
      {
        label: 'Registro de compra',
        link: '/purchases',
        // subItems: [
        //   {
        //     label: 'Nacionales',
        //     link: '/nationals'
        //   },
        //   {
        //     label: 'Importadas',
        //     link: '/imported'
        //   },
        // ]
      },
      {
        label: 'Consultas de compras',
        link: '/purchase-consultation'
      },
      {
        label: 'Reportes',
        subItems: [
          {
            label: 'Cantidad comprada vs recibida',
            link: '/purchase-and-reception'
          },
        ]
      },
    ]
  },
  {
    label: 'Inventarios',
    icon: 'layers',
    subItems: [
      {
        label: 'Kardex de movimientos',
        link: '/kardex-of-movements'
      },
      {
        label: 'Movimientos de inventario',
        link: '/inventory-movements'
      },
    ]
  },
  {
    label: 'Recibo',
    icon: 'life-buoy',
    subItems: [
      {
        label: 'Recepción de combustible',
        link: '/trips-to-receive'
      },
    ]
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Venta',
    icon: 'tag',
    subItems: [
      {
        label: 'Ticket de entrega de producto',
        link: '/product-delivery-ticket'
      },
      {
        label: 'Reporte de ventas',
        link: '/sales-report'
      },
    ]
  },
  // {
  //   label: 'Cobranza',
  //   icon: 'shopping-cart',
  //   subItems: [
  //     {
  //       label: 'Cuentas por cobrar',
  //       link: '/accounts-receivable'
  //     },
  //     {
  //       label: 'Consulta de movimientos',
  //       link: '/consultation-collection-movements'
  //     },
  //   ]
  // },
  // {
  //   label: 'Control de flujos',
  //   icon: 'filter',
  //   subItems: [
  //     {
  //       label: 'Registro de egresos',
  //       link: '/expense-record'
  //     },
  //     {
  //       label: 'Consulta de movimientos',
  //       link: '/query-movements'
  //     },
  //   ]
  // },

  // {
  //   label: '',
  //   isTitle: true
  // },
  // {
  //   label: 'Pagos diversos',
  //   icon: 'dollar-sign',
  //   subItems: [
  //     {
  //       label: 'Registro de costos indirectos',
  //       link: '/indirect-cost-record'
  //     },
  //     {
  //       label: 'Registro de abonos',
  //       link: '/credit-register'
  //     },
  //     {
  //       label: 'Consulta de movimientos',
  //       link: '/registered-movements'
  //     },
  //   ]
  // },
  // {
  //   label: 'Control de Bancos',
  //   icon: 'home',
  //   subItems: [
  //     {
  //       label: 'Registro de movimientos',
  //       link: '/movement-record'
  //     },
  //     {
  //       label: 'Consulta de movimientos',
  //       link: '/consult-bank'
  //     },
  //   ]
  // },
  // {
  //   label: 'Reportes directivos',
  //   icon: 'book-open',
  //   subItems: [
  //     {
  //       label: 'Existencias globales',
  //       link: '/global-stocks'
  //     },
  //     {
  //       label: 'Dashboard',
  //       link: '/executive-dashboard'
  //     },
  //     {
  //       label: 'Reporte concentrado',
  //       link: '/concentrated-report'
  //     },
  //   ]
  // },


  {
    label: '',
    isTitle: true
  },
  {
    label: 'Configuración general',
    icon: 'settings',
    subItems: [
      {
        label: 'Catálogos',
        subItems: [
   /*        {
            label: 'Perfiles',
            link: '/profiles'
          },
          {
            label: 'Usuarios',
            link: '/users'
          }, */
          {
            label: 'Clientes',
            link: '/clients'
          },
          {
            label: 'Proveedores',
            link: '/providers'
          },
          {
            label: 'Empresas',
            link: '/business'
          },
          {
            label: 'Almacenes ',
            link: '/stores'
          },
          {
            label: 'Sucursales',
            link: '/branchs'
          },

          {
            label: 'Articulos',
            link: '/articles'
          },
          {
            label: 'Choferes',
            link: '/drivers'
          },
          {
            label: 'Vehículos',
            link: '/vehicles'
          },
          {
            label: 'Transp. fletes',
            link: '/parcel'
          },
          {
            label: 'Concepto de gastos',
            link: '/bills'
          },
          {
            label: 'Cuentas de banco',
            link: '/bank-accounts'
          },
        ]
      },
      {
        label: 'Permisos',
        subItems: [
          {
            label: 'Privilegios',
            link: '/privileges'
          },
        ]
      },
      {
        label: 'Correo electrónico',
        link: '/email'
      },
    ]
  },

];
