export interface Customer {
  id: string;
  username: string;
  email?: string;
  gender: string;
  firstName: string;
  lastName: string;
  status: string;
  avatar: string;
  createdDate?: Date;
  updatedDate?: Date;
  updatedBy?: string;
}
