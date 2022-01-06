export interface ArtistProjectStatus {
  code: number;
  label: string;
  name: string;
  color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
}

export const artistProjectStatusColor: ArtistProjectStatus[] = [
  {
    code: 0,
    label: 'Chờ xác nhận',
    name: 'InvitePending',
    color: 'info',
  },
  {
    code: 1,
    label: 'Chờ xác nhận',
    name: 'ResponsePending',
    color: 'info',
  },
  {
    code: 2,
    label: 'Đang tham gia',
    name: 'Accept',
    color: 'warning',
  },
  {
    code: 3,
    label: 'Từ chối',
    name: 'Deny',
    color: 'error',
  },
  {
    code: 4,
    label: 'Hoàn thành',
    name: 'Done',
    color: 'success',
  },
];

export const artistProjectStatus = [
  {
    label: 'Tất cả',
    name: 'Tất cả',
  },
  {
    label: 'Chờ xác nhận (Mời)',
    name: 'InvitePending',
  },
  {
    label: 'Chờ xác nhận (Xin)',
    name: 'ResponsePending',
  },
  {
    label: 'Đang tham gia',
    name: 'Accept',
  },
  {
    label: 'Từ chối',
    name: 'Deny',
  },
  {
    label: 'Hoàn thành',
    name: 'Done',
  },
];

export const getArtistProjectStatus = (status: string) => {
  return artistProjectStatusColor.find(
    (statusColor) => statusColor.name === status
  );
};
