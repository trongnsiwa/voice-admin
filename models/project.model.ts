import { Customer } from './customer.model';

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
