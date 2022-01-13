import { MdDashboard, MdWork, MdRecordVoiceOver } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';

export interface Bar {
  icon: JSX.Element;
  name: string;
  path: string;
}

export const sidebars: Bar[] = [
  {
    icon: <MdDashboard className="h-6 w-6" />,
    name: 'Dashboard',
    path: '/',
  },
  {
    icon: <MdWork className="h-5 w-5" />,
    name: 'Project',
    path: '/project',
  },
  {
    icon: <FaUserAlt className="h-4 w-4" />,
    name: 'Customer',
    path: '/customer',
  },
  {
    icon: <MdRecordVoiceOver className="h-5 w-5" />,
    name: 'Artist',
    path: '/artist',
  },
  {
    icon: <HiDocumentReport className="h-5 w-5" />,
    name: 'Report',
    path: '/report',
  },
];
