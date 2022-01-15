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
      return 'badge-neutral';
    case 'Pending':
      return 'badge-warning';
    case 'Done':
      return 'badge-success';
    case 'Delete':
    case 'Deny':
      return 'badge-error';
    default:
      return 'badge-info';
  }
};

export const getLabelByStatus = (status: string) => {
  return projectStatusList.find((st) => st.name === status)?.label;
};
