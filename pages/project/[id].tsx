import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ArtistInProject } from 'models/artist-project.model';
import { getLabelByStatus } from 'models/project-status.model';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AiOutlineArrowLeft, AiTwotoneCalendar } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsCalendarCheck, BsCalendarEvent } from 'react-icons/bs';
import { GrClipboard } from 'react-icons/gr';
import { FiUsers } from 'react-icons/fi';

export async function getServerSideProps({ params }) {
  const data = params.id;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { project: data },
    revalidate: 1,
  };
}

const ProjectDetail = ({ project }) => {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // page
  const [activePage, setActivePage] = useState(1);

  // table
  const [data, setData] = useState<ArtistInProject[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 7;
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState<string | null>(null);

  const className = (value: string) =>
    classNames(
      'badge',
      {
        'badge-neutral': value === 'Waiting',
        'badge-warning': value === 'Pending',
        'badge-success': value === 'Done',
        'badge-error': value === 'Delete' || value === 'Deny',
        'badge-info': value === 'Progress',
      },
      'text-sm'
    );

  return (
    <Layout>
      <div className="mb-5 rounded-sm">
        <div className="w-full fixed top-16 mt-2.4 z-20 shadow-sm">
          <div className="w-full grid lg:flex items-center justify-between p-5 pb-7">
            <div className="w-full">
              <div className="flex items-center">
                <button
                  onClick={() => router.replace('/project')}
                  className="btn btn-circle btn-ghost mr-3"
                >
                  <div className="flex items-center text-gray-500 text-sm hover:text-voice-drk_hard">
                    <AiOutlineArrowLeft className="w-6 h-6" />
                  </div>
                </button>
                <p className="text-voice-drk text-xl font-bold mr-2">
                  {/* {project.name} */}
                  Project 1
                </p>
                <div className={className('Pending')}>
                  {getLabelByStatus('Pending')}
                </div>
              </div>
              <div className="w-full flex items-center mt-3 ml-12 pl-1">
                <div className="pr-12">
                  <label className="label flex items-center mb-5">
                    <span className="font-bold flex items-center">
                      <BiUser className="h-5 w-5 text-voice-drk mr-1" />
                      Poster:
                    </span>
                    <div className="ml-2">
                      {/* {project.poster.lastName} {project.poster.firstName} */}
                      Nguyen Si Trong
                    </div>
                  </label>
                  <label className="label flex items-center">
                    <span className="font-bold flex items-center">
                      <BsCalendarEvent className="h-5 w-5 mr-1" /> Created:
                    </span>
                    <div className="ml-2">
                      {dayjs(
                        new Date(new Date() as Date).toLocaleDateString()
                      ).format('HH:mm DD/MM/YYYY')}
                    </div>
                  </label>
                </div>
                <div>
                  <label className="label flex items-center mb-5">
                    <span className="font-bold flex items-center">
                      <AiTwotoneCalendar className="h-5 w-5 mr-1" />
                      Response:
                    </span>
                    <div className="ml-2">
                      {dayjs(
                        new Date(new Date() as Date).toLocaleDateString()
                      ).format('HH:mm DD/MM/YYYY')}
                    </div>
                  </label>
                  <label className="label flex items-center">
                    <span className="font-bold flex items-center">
                      {' '}
                      <BsCalendarCheck className="h-5 w-5 mr-1" />
                      Deadline:
                    </span>
                    <div className="ml-2">
                      {dayjs(
                        new Date(new Date() as Date).toLocaleDateString()
                      ).format('HH:mm DD/MM/YYYY')}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full bg-white shadow-lg z-20">
          <nav className="flex flex-col sm:flex-row">
            <button
              className={`py-4 px-6 flex hover:text-voice-ylw_dark  ${
                activePage === 1
                  ? 'text-voice-ylw_dark border-voice-ylw_dark border-t-2 font-medium focus:text-voice-ylw_dark shadow-inner'
                  : 'text-gray-600 focus:outline-none'
              }`}
              onClick={() => setActivePage(1)}
            >
              <GrClipboard className="w-5 h-5 mr-2" />
              Project Request
            </button>
            <button
              className={`py-4 px-6 flex hover:text-voice-ylw_dark focus:outline-none ${
                activePage === 2
                  ? 'text-voice-ylw_dark border-voice-ylw_dark border-t-2 font-medium focus:text-voice-ylw_dark shadow-inner'
                  : 'text-gray-600 focus:outline-none'
              }`}
              onClick={() => setActivePage(2)}
            >
              <FiUsers className="w-5 h-5 mr-2" />
              Members
            </button>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
