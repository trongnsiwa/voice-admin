export interface Artist {
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
  rate: number;
}

export const ratingList = <RatingType[]>[
  {
    label: '5 stars',
    name: '5',
  },
  {
    label: '4 stars',
    name: '4',
  },
  {
    label: '3 stars',
    name: '3',
  },
  {
    label: '2 stars',
    name: '2',
  },
  {
    label: '1 stars',
    name: '1',
  },
];

export const artists: Artist[] = [
  {
    id: 'C1',
    username: 'trongiwa',
    email: 'trongiwa@gmail.com',
    gender: 'Nam',
    firstName: 'Trọng',
    lastName: 'Nguyễn',
    status: 'Active',
    rate: 1,
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'C2',
    username: 'trong79',
    email: 'trong79@gmail.com',
    gender: 'Nam',
    firstName: 'Trọng',
    lastName: 'Sĩ',
    status: 'Active',
    rate: 2,
    avatar:
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'C3',
    username: 'trong123',
    email: 'trong123@gmail.com',
    gender: 'Nam',
    firstName: 'Trong',
    lastName: 'Chong',
    status: 'Active',
    rate: 5,
    avatar:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'C4',
    username: 'nhatue99',
    email: 'nhatue99@gmail.com',
    gender: 'Nữ',
    firstName: 'Nhã',
    lastName: 'Tuệ',
    status: 'Active',
    rate: 5,
    avatar:
      'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'C5',
    username: 'hong99',
    email: 'hong99@gmail.com',
    gender: 'Nữ',
    firstName: 'Hồng',
    lastName: 'Hoa',
    status: 'Banned',
    rate: 5,
    avatar:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
];
