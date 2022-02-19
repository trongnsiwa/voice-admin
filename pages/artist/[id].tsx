import { useEffect, useMemo, useState } from 'react';
import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft, AiOutlinePhone } from 'react-icons/ai';
import classNames from 'classnames';
import { getStatusByName } from 'models/user-status.model';
import { BsGenderAmbiguous, BsStar } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import {
  HiOutlineClipboardList,
  HiOutlineIdentification,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import { BiHash } from 'react-icons/bi';
import { RiChatVoiceLine } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdMicrophone } from 'react-icons/io';
import { MdOutlineRateReview } from 'react-icons/md';
import { ArtistRating } from 'models/artist-rating.model';
import {
  artistProjectStatus,
  getArtistProjectStatus,
} from 'models/artist-project-status.model';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { hideLoader, showLoader } from '@redux/actions';
import { getArtistDetail, getArtistRatings } from '@services/artist.service';
import { getProjectsOfArtist } from '@services/project.service';
import { ArtistDetail } from 'models/artist-detail.model';
import _ from 'lodash';
import { ProjectInArtist } from 'models/artist-project.model';
import Table from '@components/table';
import LoadingSpinner from '@components/loading-spinner';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = params?.id ?? null;

  if (!data) {
    return {
      redirect: {
        destination: '/artist',
        permanent: false,
      },
    };
  }

  return {
    props: { id: data, revalidate: 1 },
  };
};

interface ArtistDetailProps {
  id: string;
}

const ArtistDetail = ({ id }: ArtistDetailProps) => {
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

  // rating
  const [detail, setDetail] = useState<ArtistDetail>();
  const [ratings, setRatings] = useState<ArtistRating[]>([]);
  const [rateIndex, setRateIndex] = useState(1);
  const rateSize = 5;
  const [totalRate, setTotalRate] = useState(0);

  const className = (value: string) =>
    classNames(
      'badge',
      {
        'badge-success': value === 'Active',
        'badge-error': value === 'Banned',
      },
      'text-sm'
    );

  const { isLoading, error, data, isSuccess, isFetching, refetch } = useQuery(
    ['fetchProjectsArtist'],
    () => getProjectsOfArtist(pageNum, pageSize, id, status),
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
    dispatch(showLoader());

    getArtistDetail(id)
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
  }, [id]);

  useEffect(() => {
    if (data && !error) {
      setTotalResults(data.data.totalRow);
      console.log(data.data.data);
    } else {
      setTotalResults(0);
    }
  }, [data, error]);

  useEffect(() => {
    if (activePage === 1) {
      getArtistRatings(id, rateIndex, rateSize)
        .then((res) => {
          if (res.data) {
            if (ratings.length > 0) {
              setRatings((ratings) => [...ratings, ...res.data.data]);
            } else {
              setRatings(res.data.data);
            }

            setTotalRate(res.data.totalRow);
          } else {
            setRatings([]);
            setTotalRate(0);
          }
        })
        .catch((err) => {
          if (ratings.length !== 0) {
            setRatings([]);
          }

          setTotalRate(0);
        });
    }
  }, [rateIndex, activePage]);

  useEffect(() => {
    if (activePage === 2) {
      refetch().then(() => {
        setFirst(false);
      });
    }
  }, [activePage, pageNum, pageSize, status]);

  // table
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Project',
        accessor: 'projectName',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Customer',
        name: 'customerFirstName',
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const pa = original as ProjectInArtist;
          return (
            <div className="flex flex-row items-center">
              <div className="avatar hidden mr-3 md:block">
                <div className="rounded-full w-10 h-10">
                  <img
                    src={
                      !pa.customerAvatar || pa.customerAvatar === ''
                        ? 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'
                        : pa.customerAvatar
                    }
                    alt="User image"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm">{`${pa.customerLastName} ${pa.customerFirstName}`}</p>
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
        accessor: 'requrestedDate',
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
        Header: 'Done',
        accessor: 'doneDate',
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
        Cell: ({ cell: { value } }) => {
          const className = classNames(
            'badge',
            {
              'badge-info':
                value === 'InvitePending' || value === 'ResponsePending',
              'badge-warning': value === 'Accept',
              'badge-error': value === 'Deny',
              'badge-success': value === 'Done',
            },
            'text-sm p-3'
          );

          return (
            <div className={className}>
              {getArtistProjectStatus(value)?.label}
            </div>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'projectId',
        disableSortBy: true,
        disableFilters: true,
        defaultCanSort: false,
        Cell: ({ cell: { value } }) => (
          <Link href={`/project/${value}`} passHref>
            <a className="btn btn-circle btn-outline border-0 btn-ghost">
              <HiOutlinePencilAlt
                className="w-6 h-6 cursor-pointer text-gray-600"
                title="View Detail"
              />
            </a>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="pt-14">
        <div className="w-full shadow-sm flex items-center justify-between p-5 top-16 mt-2.4 z-20 ">
          <div className="w-full">
            <div className="flex items-center mt-3">
              <button
                onClick={() => router.replace('/artist')}
                className="mr-3"
              >
                <div className="flex items-center text-gray-500 hover:text-primary-dark">
                  <div className="flex items-center text-gray-500  hover:text-primary-dark hover:bg-gray-200 btn btn-ghost">
                    <span className="mr-3">
                      <AiOutlineArrowLeft className=" w-6 h-6" />
                    </span>
                    <p className="font-bold">Back</p>
                  </div>
                </div>
              </button>
            </div>
            {!detail ? (
              <>
                <div className="w-full h-full mt-5 px-5">
                  <div className="flex animate-pulse flex-row items-center h-full space-x-5">
                    <div className="w-24 bg-gray-300 h-24 rounded-full"></div>
                    <div className="flex flex-col space-y-3">
                      <div className="w-36 bg-gray-300 h-6 rounded-md"></div>
                      <div className="w-64 bg-gray-300 h-6 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="inline-block px-5 w-full mt-5">
                  <div className="flex gap-x-10">
                    <div className="avatar ">
                      <div className="w-24 h-24 rounded-full">
                        <img
                          src={
                            !detail.avatar || detail.avatar === ''
                              ? 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'
                              : detail.avatar
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div>
                        <div className="flex items-center">
                          <p className="text-primary text-xl font-bold mr-2">
                            {detail.lastName} {detail.firstName}
                          </p>
                          <div className={className(detail.status)}>
                            {getStatusByName(detail.status)?.label}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs">
                          @{detail.username}
                        </p>
                      </div>
                      <div className="flex gap-x-10 mt-5 divide-x">
                        <div className="flex gap-x-10">
                          <label className="label flex items-center">
                            <span className="font-bold flex items-center">
                              <GoMail className="h-5 w-5 mr-1 text-primary-dark" />{' '}
                              Email:
                            </span>
                            <div className="ml-2">{detail.email}</div>
                          </label>
                          <label className="label flex items-center">
                            <span className="font-bold flex items-center">
                              <BsGenderAmbiguous className="h-5 w-5 text-primary-dark mr-1" />{' '}
                              Gender:
                            </span>
                            <div className="ml-2">{detail.gender}</div>
                          </label>
                          <label className="label flex items-center">
                            <span className="font-bold flex items-center">
                              <AiOutlinePhone className="h-5 w-5 mr-1 text-primary-dark" />{' '}
                              Phone:
                            </span>
                            <div className="ml-2">{detail.phone}</div>
                          </label>
                        </div>
                        <div className="flex gap-x-10 pl-5">
                          <label className="label flex items-center">
                            <span className="font-bold flex items-center">
                              <BsStar className="h-5 w-5 mr-1" />
                              Rating:
                            </span>
                            <div className="ml-2">
                              {detail.rate
                                ? _.round(detail.rate, 2)
                                : 'No reviews yet'}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white shadow-lg z-20">
        <nav className="flex flex-row">
          <button
            className={`py-4 px-6 flex hover:text-primary-dark  ${
              activePage === 1
                ? 'text-voice-ylw_dark border-primary-dark border-t-2 font-medium focus:text-primary-dark shadow-inner'
                : 'text-gray-600 focus:outline-none'
            }`}
            onClick={() => {
              setActivePage(1);
              setFirst(true);
            }}
            disabled={!detail}
          >
            <HiOutlineIdentification className="w-5 h-5 mr-2" />
            Description
          </button>
          <button
            className={`py-4 px-6 flex hover:text-primary-dark  ${
              activePage === 2
                ? 'text-primary-dark border-primary-dark border-t-2 font-medium focus:text-primary-dark shadow-inner'
                : 'text-gray-600 focus:outline-none'
            }`}
            onClick={() => {
              setActivePage(2);
            }}
            disabled={!detail}
          >
            <HiOutlineClipboardList className="w-5 h-5 mr-2" />
            Participating Projects
          </button>
        </nav>
      </div>

      {activePage === 1 ? (
        !detail ? (
          <>
            <div className="w-full h-full mx-auto p-10">
              <div className="flex flex-col space-y-5 h-full animate-pulse">
                <div className="w-full bg-gray-300 h-[300px] rounded-md "></div>
                <div className="w-full bg-gray-300 h-[300px] rounded-md "></div>
                <div className="w-full bg-gray-300 h-[300px] rounded-md "></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="p-10 shadow-md rounded-sm"
              style={{ margin: '1.5em 1.5rem 1rem 1.5rem' }}
            >
              <div className="mb-5">
                <span className="text-primary-dark font-bold text-base flex items-center">
                  <BiHash className="w-5 h-5 mr-2" /> Self-description:
                </span>
              </div>
              <div>
                <p>{detail.bio}</p>
              </div>
            </div>
            <div
              className="p-10 shadow-md rounded-sm"
              style={{ margin: '0 1.5rem 1rem 1.5rem' }}
            >
              <div className="mb-5">
                <span className="text-primary-dark font-bold text-base flex items-center">
                  <RiChatVoiceLine className="w-5 h-5 mr-2" /> Voice
                  Characteristics:
                </span>
              </div>
              <div className="grid grid-cols-3 gap-y-10">
                <div>
                  <span className="font-bold flex items-center">
                    <IoHomeOutline className="h-5 w-5 mr-1" /> Country:
                  </span>
                  <div>
                    {detail.countries?.map((country, index) => (
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
                    <IoMdMicrophone className="h-5 w-5 mr-1" />
                    Voice Style:
                  </span>
                  <div>
                    {detail.voiceStyles?.map((style, index) => (
                      <div
                        key={`style_${index}`}
                        className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm"
                      >
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white p-10 mb-10 shadow-md rounded-sm"
              style={{ margin: '0 1.5rem 5rem 1.5rem' }}
            >
              <div className="mb-5">
                <span className="text-primary-dark font-bold text-base flex items-center">
                  <MdOutlineRateReview className="w-5 h-5 mr-2" /> Customer
                  reviews:
                </span>
                <div className="mt-3 divide-y">
                  {ratings.length === 0 ? (
                    <p className="text-gray-600">Chưa có đánh giá</p>
                  ) : (
                    ratings.map((rating) => (
                      <div key={rating.projectId} className="mb-3 pt-3">
                        <div className="flex gap-3">
                          <img
                            src={
                              !rating.avatar || rating.avatar === ''
                                ? 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'
                                : rating.avatar
                            }
                            alt=""
                            className="mt-1.5 rounded-full w-10 h-10"
                          />
                          <div className="flex justify-between w-full">
                            <div>
                              <div className="flex gap-1 items-center">
                                <p className="font-bold">
                                  {rating.lastName + ' ' + rating.firstName}
                                </p>
                                <p className="text-sm">
                                  (Project: {rating.projectName})
                                </p>
                              </div>

                              <div className="rating rating-sm">
                                <input
                                  type="radio"
                                  name="rating-6"
                                  className={`mask mask-star-2 ${
                                    rating.rate > 0
                                      ? 'bg-yellow-200'
                                      : 'bg-gray-300'
                                  }`}
                                  disabled={true}
                                />
                                <input
                                  type="radio"
                                  name="rating-6"
                                  className={`mask mask-star-2 ${
                                    rating.rate > 1
                                      ? 'bg-yellow-200'
                                      : 'bg-gray-300'
                                  }`}
                                  disabled={true}
                                />
                                <input
                                  type="radio"
                                  name="rating-6"
                                  className={`mask mask-star-2 ${
                                    rating.rate > 2
                                      ? 'bg-yellow-200'
                                      : 'bg-gray-300'
                                  }`}
                                  disabled={true}
                                />
                                <input
                                  type="radio"
                                  name="rating-6"
                                  className={`mask mask-star-2 ${
                                    rating.rate > 3
                                      ? 'bg-yellow-200'
                                      : 'bg-gray-300'
                                  }`}
                                  disabled={true}
                                />
                                <input
                                  type="radio"
                                  name="rating-6"
                                  className={`mask mask-star-2 ${
                                    rating.rate > 4
                                      ? 'bg-yellow-200'
                                      : 'bg-gray-300'
                                  }`}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <p className="text-xs">
                              {dayjs(new Date(rating.reviewDate)).format(
                                'DD/MM/YYYY'
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3">{rating.comment}</p>
                      </div>
                    ))
                  )}
                  {ratings.length < totalRate && (
                    <div>
                      <button
                        onClick={() => setRateIndex(rateIndex + 1)}
                        className="btn btn-outline btn-primary mt-5"
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="w-full h-fit mb-5">
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
              selectedStatus={status}
              notFoundMessage="No Projects"
              hasBottom={true}
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

export default ArtistDetail;
