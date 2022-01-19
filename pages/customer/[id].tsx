import { useMemo, useRef, useState } from 'react';
import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Project } from 'models/project.model';
import { AiOutlineArrowLeft, AiOutlinePhone } from 'react-icons/ai';
import classNames from 'classnames';
import { getStatusByName } from 'models/user-status.model';
import { BsGenderAmbiguous } from 'react-icons/bs';
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
    props: { customer: data, revalidate: 1 },
  };
};

const CustomerDetail = ({ customer }) => {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // page
  const [activePage, setActivePage] = useState(1);

  // table
  const [data, setData] = useState<Project[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 7;
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState<string | null>(null);

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
  //   // setData(getProjectOfCustomer(id));

  //   getUserProjects(pageNum, pageSize, status, id, true)
  //     .then((res) => {
  //       if (res.data) {
  //         setData(res.data.data);
  //         console.log(res.data.data);
  //         setTotalResults(res.data.totalRow);
  //       } else {
  //         setData([]);
  //         setTotalResults(0);
  //       }
  //     })
  //     .catch((err) => {
  //       setData([]);
  //       setTotalResults(0);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageNum, status]);

  // useEffect(() => {
  //   // if (findDetailById(id) == null) {
  //   //   history.goBack();
  //   // }

  //   // setDetail(findDetailById(id));

  //   dispatch(showLoader());

  //   getCustomerDetail(id)
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
        Header: 'Project Name',
        accessor: 'name',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Created',
        accessor: 'createdDate',
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
        Header: 'Updated',
        accessor: 'updatedDate',
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
              'badge-neutral': value === 'Waiting',
              'badge-warning': value === 'Pending',
              'badge-success': value === 'Done',
              'badge-error': value === 'Delete' || value === 'Deny',
              'badge-info': value === 'Progress',
            },
            'text-sm p-3'
          );

          return <div className={className}>{getLabelByStatus(value)}</div>;
        },
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
                    <p className="font-bold">Quay lại</p>
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
                  <div className="flex gap-x-10 mt-5">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table
          columns={columns}
          data={data}
          total={total}
          statusList={projectStatusList}
          isDetail={true}
          onStatusChange={undefined}
          notFoundMessage="No Projects"
          hasBottom={false}
        />
      </div>
    </Layout>
  );
};

export default CustomerDetail;
