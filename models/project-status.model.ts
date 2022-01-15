export interface ProjectStatus {
  code: number;
  label: string;
  name: string;
}

export const projectStatusList: ProjectStatus[] = [
  { code: -1, label: 'All', name: 'All' },
  { code: 0, label: 'Waiting', name: 'Waiting' },
  { code: 1, label: 'Pending', name: 'Pending' },
  { code: 2, label: 'In-progress', name: 'Progress' },
  { code: 3, label: 'Done', name: 'Done' },
  { code: 4, label: 'Deleted', name: 'Delete' },
  { code: 5, label: 'Denied', name: 'Deny' },
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
