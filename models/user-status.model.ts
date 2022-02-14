export interface UserStatus {
  code: string;
  label: string;
  name: string;
  color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
}

export const userStatusList = <UserStatus[]>[
  {
    code: '0',
    label: 'Active',
    name: 'Activated',
    color: 'success',
  },
  {
    code: '1',
    label: 'Banned',
    name: 'Banned',
    color: 'error',
  },
];

export const getStatusByName = (name: string) => {
  return userStatusList.find((status) => status.name === name);
};

export const getStatusByCode = (code: string) => {
  return userStatusList.find((status) => status.code === code);
};
