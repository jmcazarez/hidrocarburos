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
            link: '/a'
          },
          {
            label: 'Importadas',
            link: '/a'
          },
        ]
      },
      {
        label: 'Consultas de compras',
        link: '/a'
      },
      {
        label: 'Reportes',
        subItems: [
          {
            label: 'Cantidad comprada vs recibida',
            link: '/a'
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
        link: '/a'
      },
      {
        label: 'Movimientos de inventario',
        link: '/a'
      },
    ]
  },
  {
    label: 'Recibo',
    icon: 'life-buoy',
    subItems: [
      {
        label: 'Recepción de combustible',
        link: '/a'
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
        link: '/a'
      },
    ]
  },
  {
    label: 'Cobranza',
    icon: 'shopping-cart',
    subItems: [
      {
        label: 'Cuentas por cobrar',
        link: '/a'
      },
      {
        label: 'Consulta de movimientos',
        link: '/a'
      },
    ]
  },
  {
    label: 'Control de Flujos',
    icon: 'filter',
    subItems: [
      {
        label: 'Registro de Egresos',
        link: '/a'
      },
      {
        label: 'Consulta de movimientos',
        link: '/a'
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
        link: '/a'
      },
      {
        label: 'Registro de abonos',
        link: '/a'
      },
      {
        label: 'Consulta de movimientos',
        link: '/a'
      },
    ]
  },
  {
    label: 'Control de Bancos',
    icon: 'home',
    subItems: [
      {
        label: 'Registro de movimientos',
        link: '/a'
      },
      {
        label: 'Consulta de movimientos',
        link: '/a'
      },
    ]
  },
  {
    label: 'Reportes Directivos',
    icon: 'book-open',
    subItems: [
      {
        label: 'Existencias Globales',
        link: '/a'
      },
      {
        label: 'Dashboard',
        link: '/a'
      },
      {
        label: 'Reporte concentrado',
        link: '/a'
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
          {
            label: 'Perfiles',
            link: '/a'
          },
          {
            label: 'Usuarios',
            link: '/a'
          },
          {
            label: 'Clientes',
            link: '/a'
          },
          {
            label: 'Proveedores',
            link: '/a'
          },
          {
            label: 'Empresas',
            link: '/a'
          },
          {
            label: 'Sucursales',
            link: '/a'
          },
          {
            label: 'Almacenes ',
            link: '/a'
          },
          {
            label: 'Choferes',
            link: '/a'
          },
          {
            label: 'Vehículos',
            link: '/a'
          },
          {
            label: 'Transp. Fletes',
            link: '/a'
          },
          {
            label: 'Concepto de Gastos',
            link: '/a'
          },
          {
            label: 'Cuentas de Bancos',
            link: '/a'
          },
        ]
      },
      {
        label: 'Permisos',
        subItems: [
          {
            label: 'Privilegios',
            link: '/a'
          },
        ]
      },
      {
        label: 'Correo electrónico',
        link: '/a'
      },
    ]
  },

];
