import {
  MdOutlineDashboard,
  MdWorkOutline,
  MdOutlineRecordVoiceOver,
} from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

export interface Bar {
  icon: JSX.Element;
  name: string;
  path: string;
}

export const sidebars: Bar[] = [
  {
    icon: <MdOutlineDashboard className="h-6 w-6" />,
    name: 'Dashboard',
    path: '/',
  },
  {
    icon: <MdWorkOutline className="h-6 w-6" />,
    name: 'Project',
    path: '/project',
  },
  {
    icon: <FiUsers className="h-6 w-6" />,
    name: 'Customer',
    path: '/customer',
  },
  {
    icon: <MdOutlineRecordVoiceOver className="h-6 w-6" />,
    name: 'Artist',
    path: '/artist',
  },
  {
    icon: <MdOutlineRecordVoiceOver className="h-6 w-6" />,
    name: 'Report',
    path: '/report',
  },
];
