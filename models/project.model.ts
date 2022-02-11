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

export const ageList = <AgeType[]>[
  { name: '15 - 25', label: '15 - 25 years old' },
  { name: '26 - 33', label: '26 - 33 years old' },
  { name: '34 - 41', label: '34 - 41 years old' },
  { name: '42 - 49', label: '42 - 49 years old' },
  { name: '50 - 57', label: '50 - 57 years old' },
  { name: '57 - 64', label: '57 - 64 years old' },
];

export const priceList = <PriceType[]>[
  { startPrice: undefined, endPrice: 50000, label: 'Under 50.000đ' },
  { startPrice: 50000, endPrice: 100000, label: '50.000đ to 100.000đ' },
  { startPrice: 100000, endPrice: 500000, label: '100.000d to 500.000đ' },
  { startPrice: 500000, endPrice: 1000000, label: '500.000d to 1.000.000đ' },
  {
    startPrice: 1000000,
    endPrice: 2000000,
    label: '1.000.000d to 2.000.000đ',
  },
  {
    startPrice: 2000000,
    endPrice: 5000000,
    label: '2.000.000đ to 5.000.000đ',
  },
  {
    startPrice: 2000000,
    endPrice: undefined,
    label: '5.000.000đ & Above',
  },
];

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
