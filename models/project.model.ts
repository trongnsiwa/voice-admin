import { Customer, customers } from './customer.model';

export interface Project {
  id: string;
  name: string;
  poster: Customer;
  minAge: number;
  maxAge: number;
  price: number;
  status: string;
  responseDeadline: Date;
  projectDeadline: Date;
  createDate: Date;
  updateDate: Date;
}

export const projects: Project[] = [
  {
    id: 'P1',
    name: 'Dự án 1',
    poster: customers[0],
    minAge: 18,
    maxAge: 30,
    price: 150,
    status: 'Done',
    responseDeadline: new Date(),
    projectDeadline: new Date(),
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: 'P2',
    name: 'Dự án 2',
    poster: customers[0],
    minAge: 20,
    maxAge: 35,
    price: 200,
    status: 'Progress',
    responseDeadline: new Date(),
    projectDeadline: new Date(),
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: 'P3',
    name: 'Dự án 3',
    poster: customers[0],
    minAge: 21,
    maxAge: 36,
    price: 120,
    status: 'Pending',
    responseDeadline: new Date(),
    projectDeadline: new Date(),
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: 'P4',
    name: 'Dự án 4',
    poster: customers[0],
    minAge: 28,
    maxAge: 40,
    price: 90,
    status: 'Done',
    responseDeadline: new Date(),
    projectDeadline: new Date(),
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: 'P5',
    name: 'Dự án 5',
    poster: customers[0],
    minAge: 22,
    maxAge: 37,
    price: 100,
    status: 'Deny',
    responseDeadline: new Date(),
    projectDeadline: new Date(),
    createDate: new Date(),
    updateDate: new Date(),
  },
];
