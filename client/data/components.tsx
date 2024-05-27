import Table from '../src/pages/Table/Index';
import Graph from '../src/pages/Graph/Graph';

export const components = [
  { title: 'Главная', path: '/' },
  { title: 'Таблица', component: <Table />, path: '/table' },
  { title: 'График', component: <Graph />, path: '/graph' },
];
