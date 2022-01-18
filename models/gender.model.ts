export interface Gender {
  id: string;
  name: string;
}

export const genderList = <GenderType[]>[
  {
    id: '0',
    label: 'Men',
  },
  {
    id: '1',
    label: 'Women',
  },
  {
    id: '2',
    label: 'Other',
  },
];

export const getGenderById = (id: string) => {
  return genderList.find((gender) => gender.id === id)?.label;
};
