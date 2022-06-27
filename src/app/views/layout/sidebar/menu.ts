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
    link: '/a'
  },
  {
    label: 'Inventarios',
    icon: 'layers',
    link: '/a'
  },
  {
    label: 'Recepción de Combustible',
    icon: 'life-buoy',
    link: '/a'
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Ticket Entrega',
    icon: 'tag',
    link: '/a'
  },
  {
    label: 'Cobranza',
    icon: 'shopping-cart',
    link: '/a'
  },
  {
    label: 'Control de Flujos',
    icon: 'filter',
    link: '/a'
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Pagos Diversos',
    icon: 'dollar-sign',
    link: '/a'
  },
  {
    label: 'Bancos',
    icon: 'home',
    link: '/a'
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Reportes Directivos',
    icon: 'book-open',
    link: '/a'
  },

  {
    label: '',
    isTitle: true
  },
  {
    label: 'Configuración General',
    icon: 'settings',
    link: '/a'
  },

];
