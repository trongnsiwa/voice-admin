export interface HeaderTable {
  label: string;
  name: string;
  other?: string;
}

export type SortByType = {
  direction: string;
  value: string;
  name?: string;
};

export const projectHeader: HeaderTable[] = [
  {
    label: 'Tên dự án',
    name: 'Name',
  },
  {
    label: 'Người đăng',
    name: 'Poster',
  },
  {
    label: 'Giá',
    name: 'Price',
  },
  {
    label: 'Ngày đăng',
    name: 'CreateDate',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];

export const artistHeader: HeaderTable[] = [
  {
    label: 'Người lồng tiếng',
    name: 'Name',
  },
  {
    label: 'Đánh giá',
    name: 'Rating',
  },
  {
    label: 'Email',
    name: 'Email',
  },
  {
    label: 'Giới tính',
    name: 'Gender',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];

export const creatorHeader: HeaderTable[] = [
  {
    label: 'Khách hàng',
    name: 'Name',
  },
  {
    label: 'Email',
    name: 'Email',
  },
  {
    label: 'Giới tính',
    name: 'Gender',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];

export const projectMemberHeader: HeaderTable[] = [
  {
    label: 'Thành viên',
    name: 'Name',
  },
  {
    label: 'Ngày mời',
    name: 'InvitedDate',
  },
  {
    label: 'Ngày yêu cầu',
    name: 'RequestedDate',
  },
  {
    label: 'Ngày hủy',
    name: 'CanceledDate',
  },
  {
    label: 'Ngày tham gia',
    name: 'JoinedDate',
  },
  {
    label: 'Ngày hoàn thành',
    name: 'DoneDate',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];

export const historyProjectHeader: HeaderTable[] = [
  {
    label: 'Tên dự án',
    name: 'Name',
  },
  {
    label: 'Giá cả',
    name: 'Price',
  },
  {
    label: 'Ngày đăng',
    name: 'CreateDate',
  },
  {
    label: 'Ngày cập nhật',
    name: 'UpdateDate',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];

export const artistProjectHeader: HeaderTable[] = [
  {
    label: 'Tên dự án',
    name: 'Name',
  },
  {
    label: 'Khách hàng',
    name: 'Name',
  },
  {
    label: 'Ngày được mời',
    name: 'InvitedDate',
  },
  {
    label: 'Ngày yêu cầu',
    name: 'RequestedDate',
  },
  {
    label: 'Ngày hủy',
    name: 'CancelDate',
  },
  {
    label: 'Ngày tham gia',
    name: 'JoinedDate',
  },
  {
    label: 'Ngày hoàn thành',
    name: 'DoneDate',
  },
  {
    label: 'Tình trạng',
    name: 'Status',
  },
];
