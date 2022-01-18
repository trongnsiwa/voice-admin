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
