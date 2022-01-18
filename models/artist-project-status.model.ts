export interface ArtistProjectStatus {
  code: number;
  label: string;
  name: string;
  color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
}

export const artistProjectStatusColor: ArtistProjectStatus[] = [
  {
    code: 0,
    label: 'Invite Pending',
    name: 'InvitePending',
    color: 'info',
  },
  {
    code: 1,
    label: 'Response Pending',
    name: 'ResponsePending',
    color: 'info',
  },
  {
    code: 2,
    label: 'Accepted',
    name: 'Accept',
    color: 'warning',
  },
  {
    code: 3,
    label: 'Denied',
    name: 'Deny',
    color: 'error',
  },
  {
    code: 4,
    label: 'Done',
    name: 'Done',
    color: 'success',
  },
];

export const artistProjectStatus = [
  {
    label: 'Invite Pending',
    name: 'InvitePending',
  },
  {
    label: 'Response Pending',
    name: 'ResponsePending',
  },
  {
    label: 'Accepted',
    name: 'Accept',
  },
  {
    label: 'Denied',
    name: 'Deny',
  },
  {
    label: 'Done',
    name: 'Done',
  },
];

export const getArtistProjectStatus = (status: string) => {
  return artistProjectStatusColor.find(
    (statusColor) => statusColor.name === status
  );
};
