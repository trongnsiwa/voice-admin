export interface UserStatus {
  code: string;
  label: string;
  name: string;
  color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
}

export const userStatusColor: UserStatus[] = [
  {
    code: '-1',
    name: 'Tất cả',
    label: 'Tất cả',
  },
  {
    code: '0',
    label: 'Kích hoạt',
    name: 'Activated',
    color: 'success',
  },
  {
    code: '1',
    label: 'Đã chặn',
    name: 'Banned',
    color: 'error',
  },
];

export const getStatusByName = (name: string) => {
  return userStatusColor.find((statusColor) => statusColor.name === name);
};

export const getStatusByCode = (code: string) => {
  return userStatusColor.find((statusColor) => statusColor.code === code);
};
