import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: '',
    isTitle: true
  },
  {
    label: 'Talero Indicadores',
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
        subItems: [
          {
            label: 'Nacionales',
            link: '/nationals'
          },
          {
            label: 'Importadas',
            link: '/imported'
          },
        ]
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
        label: 'Ticket de Entrega de producto',
        link: '/product-delivery-ticket'
      },
    ]
  },
  {
    label: 'Cobranza',
    icon: 'shopping-cart',
    subItems: [
      {
        label: 'Cuentas por cobrar',
        link: '/accounts-receivable'
      },
      {
        label: 'Consulta de movimientos',
        link: '/consultation-collection-movements'
      },
    ]
  },
  {
    label: 'Control de Flujos',
    icon: 'filter',
    subItems: [
      {
        label: 'Registro de Egresos',
        link: '/expense-record'
      },
      {
        label: 'Consulta de movimientos',
        link: '/query-movements'
      },
    ]
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Pagos Diversos',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'Registro de costos indirectos',
        link: '/indirect-cost-record'
      },
      {
        label: 'Registro de abonos',
        link: '/credit-register'
      },
      {
        label: 'Consulta de movimientos',
        link: '/registered-movements'
      },
    ]
  },
  {
    label: 'Control de Bancos',
    icon: 'home',
    subItems: [
      {
        label: 'Registro de movimientos',
        link: '/movement-record'
      },
      {
        label: 'Consulta de movimientos',
        link: '/consult-bank'
      },
    ]
  },
  {
    label: 'Reportes Directivos',
    icon: 'book-open',
    subItems: [
      {
        label: 'Existencias Globales',
        link: '/global-stocks'
      },
      {
        label: 'Dashboard',
        link: '/executive-dashboard'
      },
      {
        label: 'Reporte concentrado',
        link: '/concentrated-report'
      },
    ]
  },


  {
    label: '',
    isTitle: true
  },
  {
    label: 'Configuración General',
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
        /*   {
            label: 'Choferes',
            link: '/drivers'
          },
          {
            label: 'Vehículos',
            link: '/vehicles'
          },
          {
            label: 'Transp. Fletes',
            link: '/parcel'
          }, */
          {
            label: 'Concepto de Gastos',
            link: '/bills'
          },
          {
            label: 'Cuentas de Banco',
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
