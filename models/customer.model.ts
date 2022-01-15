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

export const customers: Customer[] = [
  {
    id: 'C1',
    username: 'trongiwa',
    email: 'trongiwa@gmail.com',
    gender: 'Nam',
    firstName: 'Trọng',
    lastName: 'Nguyễn',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
  },
  {
    id: 'C2',
    username: 'trong79',
    email: 'trong79@gmail.com',
    gender: 'Nam',
    firstName: 'Trọng',
    lastName: 'Sĩ',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
  },
  {
    id: 'C3',
    username: 'trong123',
    email: 'trong123@gmail.com',
    gender: 'Nam',
    firstName: 'Trong',
    lastName: 'Chong',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
  },
  {
    id: 'C4',
    username: 'nhatue99',
    email: 'nhatue99@gmail.com',
    gender: 'Nữ',
    firstName: 'Nhã',
    lastName: 'Tuệ',
    status: 'Inactive',
    avatar:
      'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
  },
  {
    id: 'C5',
    username: 'hong99',
    email: 'hong99@gmail.com',
    gender: 'Nữ',
    firstName: 'Hồng',
    lastName: 'Hoa',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
  },
];
