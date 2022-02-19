import { useEffect, useMemo, useState } from 'react';
import Layout from '@components/layouts/layout';
import { useAppDispatch } from '@redux/store/hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft, AiOutlinePhone } from 'react-icons/ai';
import classNames from 'classnames';
import { getStatusByName } from 'models/user-status.model';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { GoMail } from 'react-icons/go';
import Table from '@components/table';
import {
  getLabelByStatus,
  projectStatusList,
} from 'models/project-status.model';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import { CustomerDetail } from 'models/customer-detail.model';
import { hideLoader, showLoader } from '@redux/actions';
import { getCustomerDetail } from '@services/customer.service';
import { useQuery } from 'react-query';
import { getUserProjects } from '@services/project.service';
import Link from 'next/link';
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

interface CustomerDetailProps {
  id: string;
}

const CustomerDetail = ({ id }: CustomerDetailProps) => {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // table
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [first, setFirst] = useState(true);

  const [status, setStatus] = useState<string | null>(null);

  const [detail, setDetail] = useState<CustomerDetail>();

  const className = (value: string) =>
    classNames(
      'badge',
      {
        'bg-green-100 text-green-700 border-none': value === 'Activated',
        'badge-error': value === 'Banned',
      },
      'text-sm'
    );

  const { isLoading, error, data, isSuccess, isFetching, refetch } = useQuery(
    ['fetchProjectsCustomer'],
    () => getUserProjects(pageNum, pageSize, status, id, true),
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
    dispatch(showLoader());

    getCustomerDetail(id)
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
    refetch().then(() => {
      setFirst(false);
    });
  }, [pageNum, pageSize, status]);

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
        accessor: 'createDate',
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
        accessor: 'updateDate',
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
              'bg-green-100 text-green-700 border-none': value === 'Done',
              'badge-error': value === 'Delete' || value === 'Deny',
              'badge-info': value === 'Progress',
            },
            'text-sm p-3'
          );

          return <div className={className}>{getLabelByStatus(value)}</div>;
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
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-full">
                        <img src={detail.avatar} alt="" />
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
                      <div className="flex gap-x-10 mt-5">
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
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        {first ? (
          <div className="p-10">
            <LoadingSpinner />
          </div>
        ) : (
          <Table
            columns={columns}
            data={data ? data.data.data : null}
            total={totalResults}
            statusList={projectStatusList}
            isDetail={true}
            onStatusChange={(name: string, value: string | null) => {
              setStatus(value);
            }}
            notFoundMessage="No Projects"
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
    </Layout>
  );
};

export default CustomerDetail;
