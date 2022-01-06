export interface ProjectStatus {
  code: number;
  label: string;
  name: string;
}

export const projectStatusList: ProjectStatus[] = [
  { code: -1, label: 'Tất cả', name: 'All' },
  { code: 0, label: 'Đang chỉnh sửa', name: 'Waiting' },
  { code: 1, label: 'Đang thuê', name: 'Pending' },
  { code: 2, label: 'Tiến hành', name: 'Process' },
  { code: 3, label: 'Hoàn tất', name: 'Done' },
  { code: 4, label: 'Đã hủy', name: 'Delete' },
  { code: 5, label: 'Từ chối chỉnh sửa', name: 'Deny' },
];

export const statusColor = (status: string) => {
  switch (status) {
    case 'Waiting':
      return 'neutral';
    case 'Pending':
      return 'warning';
    case 'Done':
      return 'success';
    case 'Delete':
    case 'Deny':
      return 'error';
    default:
      return 'info';
  }
};

export const getLabelByStatus = (status: string) => {
  return projectStatusList.find((st) => st.name === status)?.label;
};
