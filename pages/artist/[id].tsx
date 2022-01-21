import { useMemo, useRef, useState } from 'react';
import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Project } from 'models/project.model';
import { AiOutlineArrowLeft, AiOutlinePhone } from 'react-icons/ai';
import classNames from 'classnames';
import { getStatusByName } from 'models/user-status.model';
import { BsGenderAmbiguous, BsStar } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { useHover } from 'usehooks-ts';
import { FiUser } from 'react-icons/fi';
import Table from '@components/table';
import {
  getLabelByStatus,
  projectStatusList,
} from 'models/project-status.model';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import { ProjectInArtist } from 'models/artist-project.model';
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
    props: { artist: data, revalidate: 1 },
  };
};

const ArtistDetail = () => {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // page
  const [activePage, setActivePage] = useState(1);

  // table
  const [data, setData] = useState<ProjectInArtist[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 7;
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState<string | null>(null);

  // rating
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

  const btnBackRef = useRef(null);
  const isHover = useHover(btnBackRef);

  // useEffect(() => {
  //   // setData(getJoinedProjectsOfArtist(id));

  //   if (activePage === 2) {
  //     getProjectsOfArtist(pageNum, pageSize, id, status)
  //       .then((res) => {
  //         if (res.data) {
  //           setData(res.data.data);
  //           setTotalResults(res.data.totalRow);
  //         } else {
  //           setData([]);
  //           setTotalResults(0);
  //         }
  //       })
  //       .catch((err) => {
  //         setData([]);
  //         setTotalResults(0);
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activePage, pageNum, status]);

  // useEffect(() => {
  //   if (activePage === 1) {
  //     getArtistRatings(id, numRate, sizeRate)
  //       .then((res) => {
  //         if (res.data) {
  //           setRatings(res.data.data);
  //           setTotalRate(res.data.totalRow);
  //         } else {
  //           setRatings([]);
  //           setTotalRate(0);
  //         }
  //       })
  //       .catch((err) => {
  //         setRatings([]);
  //         setTotalRate(0);
  //       });
  //   }
  // }, [numRate, activePage]);

  // function onPageChange(p: any) {
  //   setPageNum(p);
  // }

  // useEffect(() => {
  //   const moreEvents: History[] = [
  //     ...events,
  //     ...artistHistories
  //       .filter((his) => his.artist!.id === id)
  //       .slice((page - 1) * resultsPerPage, page * resultsPerPage),
  //   ];
  //   setEvents(moreEvents);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);

  // useEffect(() => {
  //   // if (findDetailById(id) == null) {
  //   //   history.goBack();
  //   // }

  //   // setDetail(findDetailById(id));

  //   getArtistDetail(id)
  //     .then((res) => {
  //       if (res.data) {
  //         setDetail(res.data);
  //         dispatch(hideLoader());
  //       } else {
  //         history.goBack();
  //         dispatch(hideLoader());
  //         NotificationManager.error(
  //           ERRORS.ERR_RESOURCE_NOT_FOUND,
  //           'Thất bại',
  //           1000
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       history.goBack();
  //       dispatch(hideLoader());
  //       NotificationManager.error(
  //         ERRORS.ERR_RESOURCE_NOT_FOUND,
  //         'Thất bại',
  //         1000
  //       );
  //     });
  // }, [history, id, dispatch]);

  // table
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Project',
        accessor: 'name',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Customer',
        accessor: 'customerName',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
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
        accessor: 'cancelDate',
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
        accessor: 'id',
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
                onClick={() => router.replace('/customer')}
                className="mr-3"
                ref={btnBackRef}
              >
                <div className="flex items-center text-gray-500 hover:text-primary-dark">
                  <div className="flex items-center text-gray-500  hover:text-primary-dark">
                    <span
                      className={`hover:bg-gray-200 rounded-full mr-1 p-3 ${
                        isHover && 'bg-gray-200'
                      }`}
                    >
                      <AiOutlineArrowLeft className=" w-6 h-6" />
                    </span>
                    <p className="font-bold">Back</p>
                  </div>
                </div>
              </button>
            </div>
            <div className="inline-block px-5 w-full mt-5">
              <div className="flex gap-x-10">
                <div className="avatar ">
                  <div className="w-24 h-24 rounded-full">
                    <img
                      src={
                        'http://daisyui.com/tailwind-css-component-profile-1@94w.png'
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center">
                    <p className="text-primary text-xl font-bold mr-2">
                      {/* {detail.lastName} {detail.firstName} */}
                      Nguyen Si Trong
                    </p>
                    <div className={className('Active')}>
                      {getStatusByName('Active')?.label}
                    </div>
                  </div>
                  <div className="flex gap-x-10 mt-5 divide-x">
                    <div className="flex gap-x-10">
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <FiUser className="h-5 w-5 mr-1 text-primary-dark" />{' '}
                          Username:
                        </span>
                        <div className="ml-2">trongnsi</div>
                      </label>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <GoMail className="h-5 w-5 mr-1 text-primary-dark" />{' '}
                          Email:
                        </span>
                        <div className="ml-2">trongnsiwa79@gmail.com</div>
                      </label>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <BsGenderAmbiguous className="h-5 w-5 text-primary-dark mr-1" />{' '}
                          Gender:
                        </span>
                        <div className="ml-2">Men</div>
                      </label>
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <AiOutlinePhone className="h-5 w-5 mr-1 text-primary-dark" />{' '}
                          Phone:
                        </span>
                        <div className="ml-2">0977158941</div>
                      </label>
                    </div>
                    <div className="flex gap-x-10 pl-5">
                      <label className="label flex items-center">
                        <span className="font-bold flex items-center">
                          <BsStar className="h-5 w-5 mr-1" />
                          Rating
                        </span>
                        <div className="ml-2">
                          {/* {detail.rate ? detail.rate : 'Chưa có đánh giá'} */}
                          5.0
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white shadow-lg z-20">
        <nav className="flex flex-col sm:flex-row">
          <button
            className={`py-4 px-6 flex hover:text-primary-dark  ${
              activePage === 1
                ? 'text-voice-ylw_dark border-primary-dark border-t-2 font-medium focus:text-primary-dark shadow-inner'
                : 'text-gray-600 focus:outline-none'
            }`}
            onClick={() => setActivePage(1)}
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
            onClick={() => setActivePage(2)}
          >
            <HiOutlineClipboardList className="w-5 h-5 mr-2" />
            Participating Projects
          </button>
        </nav>
      </div>

      {activePage === 1 ? (
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
              <p>
                {/* {detail.bio} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                accusamus nobis temporibus veritatis sit accusantium, saepe
                reiciendis odit totam minus ex harum culpa ut beatae, eius
                pariatur autem expedita molestias?
              </p>
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
                  {/* {detail.countries?.map((country, index) => ( */}
                  <div className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm">
                    Miền Bắc
                  </div>
                  {/* ))} */}
                </div>
              </div>
              <div>
                <span className="font-bold flex items-center">
                  <IoMdMicrophone className="h-5 w-5 mr-1" />
                  Voice Style:
                </span>
                <div>
                  {/* {detail.voiceStyles?.map((style, index) => ( */}
                  <div className="badge badge-ghost bg-gray-200 p-3 text-primary m-3 ml-0 shadow-sm">
                    Giọng trầm
                  </div>
                  {/* ))} */}
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
                          src={rating.avatar}
                          alt=""
                          className="mt-1.5 rounded-full w-10 h-10"
                        />
                        <div className="flex justify-between w-full">
                          <div>
                            <p className="font-bold">
                              {rating.lastName + ' ' + rating.firstName}
                            </p>
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
                            <p className="text-sm">
                              (Project: {rating.projectName})
                            </p>
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
                  <button
                    onClick={() => setRateIndex(rateIndex + 1)}
                    className="btn btn-primary mt-5"
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <Table
            columns={columns}
            data={data}
            total={total}
            statusList={artistProjectStatus}
            isDetail={true}
            onStatusChange={undefined}
            notFoundMessage="No Projects"
            hasBottom={false}
          />
        </div>
      )}
    </Layout>
  );
};

export default ArtistDetail;
