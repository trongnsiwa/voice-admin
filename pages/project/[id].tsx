import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ArtistInProject } from 'models/artist-project.model';
import { getLabelByStatus } from 'models/project-status.model';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import {
  AiOutlineArrowLeft,
  AiTwotoneCalendar,
  AiOutlineHome,
} from 'react-icons/ai';
import { BiUser, BiHash } from 'react-icons/bi';
import {
  BsCalendarCheck,
  BsCalendarEvent,
  BsGenderAmbiguous,
} from 'react-icons/bs';
import { GrClipboard } from 'react-icons/gr';
import { FiUsers } from 'react-icons/fi';
import {
  HiOutlineCash,
  HiOutlineColorSwatch,
  HiOutlineMicrophone,
} from 'react-icons/hi';
import { RiCake2Line } from 'react-icons/ri';
import Table from '@components/table';
import { Column } from 'react-table';
import {
  artistProjectStatus,
  getArtistProjectStatus,
} from 'models/artist-project-status.model';
import {
  getArtistsInProject,
  getProjectDetail,
} from '@services/project.service';
import { ProjectDetail } from 'models/project-detail.model';
import { hideLoader, showLoader } from '@redux/actions';
import { useQuery } from 'react-query';
import LoadingSpinner from '@components/loading-spinner';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = params?.id ?? null;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { id: data, revalidate: 1 },
  };
};

interface ProjectDetailProps {
  id: string;
}

const ProjectDetail = ({ id }: ProjectDetailProps) => {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // page
  const [activePage, setActivePage] = useState(1);

  // table
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [first, setFirst] = useState(true);

  const [status, setStatus] = useState<string | null>(null);

  const [detail, setDetail] = useState<ProjectDetail>();

  const className = (value: string) =>
    classNames(
      'badge',
      {
        'badge-neutral': value === 'Waiting',
        'badge-warning': value === 'Pending',
        'bg-green-100 text-green-700 border-none': value === 'Done',
        'badge-error': value === 'Delete' || value === 'Deny',
        'badge-info': value === 'Progress',
      },
      'text-sm'
    );

  const { isLoading, error, data, isSuccess, isFetching, refetch } = useQuery(
    ['fetchArtistsProject'],
    () => getArtistsInProject(pageNum, pageSize, id, status),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data && !error) {
      setTotalResults(data.data.totalRow);
      console.log(data.data.data);
    } else {
      setTotalResults(0);
    }
  }, [data, error]);

  useEffect(() => {
    if (activePage === 2) {
      refetch().then(() => {
        setFirst(false);
      });
    }
  }, [activePage, pageNum, pageSize, status]);

  const loadDetail = () => {
    getProjectDetail(id)
      .then((res) => {
        if (res.data) {
          setDetail(res.data);
          dispatch(hideLoader());
        } else {
          router.back();
          dispatch(hideLoader());
        }
      })
      .catch((err) => {
        router.back();
        dispatch(hideLoader());
      });
  };

  useEffect(() => {
    dispatch(showLoader());

    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // table
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Member',
        accessor: 'name',
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const ap = original as ArtistInProject;

          return (
            <div className="flex flex-row items-center">
              <div className="avatar hidden mr-3 md:block">
                <div className="rounded-full w-10 h-10">
                  <img src={ap.artistFirstName} alt="User image" />
                </div>
              </div>

              <div>
                <p className="font-semibold text-sm">{`${ap.artistLastName} ${ap.artistFirstName}`}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Invited',
        accessor: 'invitedDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {value
              ? dayjs(new Date(value as Date).toLocaleDateString()).format(
                  'DD/MM/YYYY'
                )
              : 'None'}
          </span>
        ),
      },
      {
        Header: 'Requested',
        accessor: 'requestedDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {value
              ? dayjs(new Date(value as Date).toLocaleDateString()).format(
                  'DD/MM/YYYY'
                )
              : 'None'}
          </span>
        ),
      },
      {
        Header: 'Canceled',
        accessor: 'canceledDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {value
              ? dayjs(new Date(value as Date).toLocaleDateString()).format(
                  'DD/MM/YYYY'
                )
              : 'None'}
          </span>
        ),
      },
      {
        Header: 'Joined',
        accessor: 'joinedDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {value
              ? dayjs(new Date(value as Date).toLocaleDateString()).format(
                  'DD/MM/YYYY'
                )
              : 'None'}
          </span>
        ),
      },
      {
        Header: 'Finished',
        accessor: 'finishedDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {value
              ? dayjs(new Date(value as Date).toLocaleDateString()).format(
                  'DD/MM/YYYY'
                )
              : 'None'}
          </span>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        disableFilters: true,
        defaultCanSort: false,
        Cell: ({ cell: { value } }) => {
          const className = classNames(
            'badge',
            {
              'badge-warning': value === 'Accept',
              'badge-success': value === 'Done',
              'badge-error': value === 'Deny',
              'badge-info':
                value === 'InvitePending' || value == 'ResponsePending',
            },
            'text-sm'
          );

          return (
            <div className={className}>
              {getArtistProjectStatus(value)?.label}
            </div>
          );
        },
      },
    ],
    []
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
                  <div className="flex items-center text-gray-500 text-sm hover:text-primary-dark">
                    <AiOutlineArrowLeft className="w-6 h-6" />
                  </div>
                </button>
                {!detail ? (
                  <>
                    <div className="w-full h-full mt-5 px-5">
                      <div className="flex animate-pulse flex-row items-center h-full space-x-5">
                        <div className="w-36 bg-gray-300 h-6 rounded-full"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-primary text-xl font-bold mr-2">
                      {detail.name}
                    </p>
                    <div className={className(detail.status)}>
                      {getLabelByStatus(detail.status)}
                    </div>
                  </>
                )}
              </div>
              {!detail ? (
                <div className="w-full h-full mt-5 px-5">
                  <div className="flex animate-pulse flex-row items-center h-full space-x-5">
                    <div className="ml-12 pl-1 flex flex-col space-y-3">
                      <div className="w-64 bg-gray-300 h-6 rounded-md"></div>
                      <div className="w-64 bg-gray-300 h-6 rounded-md"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full flex items-center ml-12 pl-1">
                    <div className="pr-12">
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <BiUser className="h-5 w-5 text-primary-dark mr-1" />
                          Poster:
                        </span>
                        <div className="ml-2">
                          {detail.poster.lastName} {detail.poster.firstName}
                        </div>
                      </label>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <BsCalendarEvent className="h-5 w-5 mr-2" /> Created:
                        </span>
                        <div className="ml-2">
                          {dayjs(
                            new Date(
                              detail.createDate as Date
                            ).toLocaleDateString()
                          ).format('HH:mm DD/MM/YYYY')}
                        </div>
                      </label>
                    </div>
                    <div>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <AiTwotoneCalendar className="h-5 w-5 mr-2" />
                          Response:
                        </span>
                        <div className="ml-2">
                          {dayjs(
                            new Date(
                              detail.responseDeadline as Date
                            ).toLocaleDateString()
                          ).format('HH:mm DD/MM/YYYY')}
                        </div>
                      </label>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          {' '}
                          <BsCalendarCheck className="h-5 w-5 mr-2" />
                          Deadline:
                        </span>
                        <div className="ml-2">
                          {dayjs(
                            new Date(
                              detail.projectDeadline as Date
                            ).toLocaleDateString()
                          ).format('HH:mm DD/MM/YYYY')}
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full bg-white shadow-lg z-20">
          <nav className="flex flex-col sm:flex-row">
            <button
              className={`py-4 px-6 flex hover:text-primary-dark  ${
                activePage === 1
                  ? 'text-primary-dark border-primary-dark border-t-2 font-medium focus:text-primary-dark shadow-inner'
                  : 'text-gray-600 focus:outline-none'
              }`}
              onClick={() => setActivePage(1)}
            >
              <GrClipboard className="w-5 h-5 mr-2" />
              Project Requirement
            </button>
            <button
              className={`py-4 px-6 flex hover:text-primary-dark focus:outline-none ${
                activePage === 2
                  ? 'text-voice-ylw_dark border-primary-dark border-t-2 font-medium focus:text-primary-dark shadow-inner'
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

      {activePage === 1 ? (
        !detail ? (
          <div
            className="w-full h-full mx-auto p-10"
            style={{ margin: '15em 1.5rem 5rem 1.5rem' }}
          >
            <div className="flex flex-col space-y-5 h-full animate-pulse">
              <div className="w-full bg-gray-300 h-[150px] rounded-md "></div>
              <div className="w-full bg-gray-300 h-[300px] rounded-md "></div>
            </div>
          </div>
        ) : (
          <div
            className="p-10 mb-10"
            style={{ margin: '15em 1.5rem 5rem 1.5rem' }}
          >
            <div className="card card-bordere rounded-none mb-5 shadow-md py-2">
              <div className="card-body">
                <div className="flex flex-col md:flex-row">
                  <div className="w-max flex items-center">
                    <BiHash className="h-5 w-5 mr-1" />
                    <span className="font-bold pb-1">Project description:</span>
                  </div>

                  <div className="w-full md:w-2/3 mt-3 md:mt-0 md:ml-5">
                    <p>{detail.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-bordered rounded-none shadow-md">
              <div className="card-body">
                <div className="grid grid-cols-3 gap-y-10 gap-x-5">
                  <div>
                    <span className="font-bold flex items-center">
                      <AiOutlineHome className="h-5 w-5 mr-1" />
                      Country:
                    </span>
                    <div className="mt-1.5">
                      {detail.projectCountries?.map((country, index) => (
                        <div
                          key={`country_${index}`}
                          className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm"
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold flex items-center">
                      {' '}
                      <HiOutlineMicrophone className="h-5 w-5 mr-1" />
                      Voice Style:
                    </span>
                    <div className="mt-1.5">
                      {detail.projectVoiceStyles?.map((style, index) => (
                        <div
                          key={`style_${index}`}
                          className="badge badge-ghost bg-gray-200 p-3 text-primary mr-3 mt-3 shadow-sm"
                        >
                          {style}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold flex items-center">
                      <BsGenderAmbiguous className="h-5 w-5 mr-1" />
                      Gender:
                    </span>
                    <div className="mt-1.5">
                      {detail.projectGenders?.map((gender, index) => (
                        <div
                          key={`gender_${index}`}
                          className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm"
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold flex items-center">
                      <HiOutlineColorSwatch className="h-5 w-5 mr-1" />
                      Usage Purpose:
                    </span>
                    <div className="mt-1.5">
                      {detail.projectUsagePurposes?.map((purpose, index) => (
                        <div
                          key={`purpose_${index}`}
                          className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm"
                        >
                          {purpose}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold flex items-center">
                      <HiOutlineCash className="h-5 w-5 mr-1" />
                      Price:
                    </span>
                    <div className="mt-1.5">
                      <div className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm">
                        {detail.price}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold flex items-center">
                      <RiCake2Line className="h-5 w-5 mr-1" />
                      Age:
                    </span>
                    <div className="mt-1.5">
                      <div className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm">
                        {detail.minAge} - {detail.maxAge}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full mt-[15em]">
          {first ? (
            <div className="p-10">
              <LoadingSpinner />
            </div>
          ) : (
            <Table
              columns={columns}
              data={data ? data.data.data : null}
              total={totalResults}
              statusList={artistProjectStatus}
              isDetail={true}
              onStatusChange={(name: string, value: string | null) => {
                setStatus(value);
              }}
              notFoundMessage="No Members"
              hasBottom={false}
              isSuccess={isSuccess}
              queryPageIndex={pageNum - 1}
              setQueryPageIndex={setPageNum}
              queryPageSize={pageSize}
              setQueryPageSize={setPageSize}
              isLoading={isLoading}
              isFetching={isFetching}
              filterObj={status}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetail;
