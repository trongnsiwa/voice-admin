export interface CustomerDetail {
  id: string;
  username?: string;
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: number;
  gender: string;
  status: string;
  avatar: string;
  createDate?: Date;
  updateDate?: Date;
  updatedBy?: string;
}
