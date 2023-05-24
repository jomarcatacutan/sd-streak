import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Tickets',
    isTitle: true
  },
  {
    label: 'Advisors',
    icon: 'users',
    link: '/advisors'
  },
];
