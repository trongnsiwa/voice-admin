import Layout from '@components/layouts/layout';
import Modal from '@components/modal';
import SearchBar from '@components/search-bar';
import Select from '@components/select';
import Table from '@components/table';
import { hideLoader, showLoader } from '@redux/actions';
import { useAppDispatch } from '@redux/store/hooks';
import {
  changeStatusOfCustomer,
  CustomerFilterObject,
  getCustomers,
} from '@services/customer.service';
import classNames from 'classnames';
import { Customer } from 'models/customer.model';
import { genderList } from 'models/gender.model';
import { userStatusList, getStatusByName } from 'models/user-status.model';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BsGenderAmbiguous, BsTags } from 'react-icons/bs';
import {
  HiOutlineBan,
  HiOutlineCheckCircle,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { useOnClickOutside } from 'usehooks-ts';

const Customer = () => {
  const dispatch = useAppDispatch();

  // modal
  const [banModal, updateBanModal] = useState<BanModalType>({
    open: false,
    selected: null,
    status: null,
  });
  const banModalRef = useRef(null);

  // filter
  const [filterObj, setFilterObj] = useState<CustomerFilterObject>({
    Status: null,
    Gender: null,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  // search
  const [searchBy, setSearchBy] = useState('');

  const { isLoading, error, data, isSuccess, isFetching, refetch } = useQuery(
    ['fetchProjects', pageNumber, pageSize, searchBy, filterObj],
    () => getCustomers(pageNumber, pageSize, searchBy.trim(), filterObj),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (data && !error) {
      setTotalResults(data.data.totalRow);
    } else {
      setTotalResults(0);
    }
  }, [data, error]);

  const banUser = () => {
    if (banModal.selected == null || banModal.status == null) {
      return;
    }

    dispatch(showLoader());

    const changedStatus = banModal.status === 'Activated' ? 1 : 0;
    console.log(changedStatus);

    changeStatusOfCustomer(banModal.selected, changedStatus)
      .then((res) => {
        dispatch(hideLoader());
        // NotificationManager.success(
        //   banModal.status === 'Activated'
        //     ? SUCCESS.BAN_USER_SUCCESS
        //     : SUCCESS.UNBAN_USER_SUCCESS,
        //   'Thành công',
        //   1000
        // );
        updateBanModal({
          open: false,
          selected: null,
          status: null,
        });
        refetch();
      })
      .catch((err) => {
        // showStoreErrorMessage(err, dispatch);
      });
  };

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Customer',
        accessor: 'name',
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const customer = original as Customer;

          return (
            <div className="flex flex-row items-center">
              <div className="avatar hidden mr-3 md:block">
                <div className="rounded-full w-10 h-10">
                  <img src={customer.avatar} alt="User image" />
                </div>
              </div>

              <div>
                <p className="text-sm">{`${customer.lastName} ${customer.firstName}`}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => {
          const className = classNames(
            'badge',
            {
              'bg-green-100 text-green-700 border-none': value === 'Activated',
              'badge-error': value === 'Banned',
            },
            'text-sm p-3'
          );

          return (
            <div className={className}>{getStatusByName(value)?.label}</div>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'id',
        disableSortBy: true,
        disableFilters: true,
        defaultCanSort: false,
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const customer = original as Customer;

          return (
            <div className="flex flex-row items-center text-gray-600">
              <Link href={`/customer/${customer.id}`} passHref>
                <a className="btn btn-circle btn-outline border-0 btn-ghost">
                  <HiOutlinePencilAlt
                    className="w-6 h-6 cursor-pointer text-gray-600"
                    title="View Detail"
                  />
                </a>
              </Link>
              {customer.status === 'Active' ? (
                <button
                  title="Ban user"
                  onClick={() =>
                    updateBanModal({
                      open: true,
                      selected: customer.id,
                      status: customer.status,
                    })
                  }
                  className="btn btn-outline border-0 hover:bg-error-light hover:text-error text-gray-600 text-sm flex items-center gap-1"
                >
                  <HiOutlineBan className="w-6 h-6 cursor-pointer" />
                  Ban
                </button>
              ) : (
                <button
                  title="Activate user"
                  onClick={() =>
                    updateBanModal({
                      open: true,
                      selected: customer.id,
                      status: customer.status,
                    })
                  }
                  className="btn btn-outline hover:bg-success border-0 text-gray-600 hover:text-success-dark text-sm flex items-center gap-1"
                >
                  <HiOutlineCheckCircle className="w-6 h-6 cursor-pointer" />
                  Activate
                </button>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const closeBanModal = () => {
    updateBanModal({
      open: false,
      selected: null,
      status: null,
    });
  };

  const filter = (name: string, value: string | null) => {
    switch (name) {
      case 'Status':
        setFilterObj({
          ...filterObj,
          Status: value,
        });
        break;
      case 'Gender':
        setFilterObj({
          ...filterObj,
          Gender: value,
        });
        break;
    }

    setPageNumber(1);
  };

  useOnClickOutside(banModalRef, closeBanModal);

  return (
    <Layout>
      <div className="pt-28">
        <div className="px-10">
          <div className="flex justify-between items-center border-b-2 border-gray-100 mb-5 pb-5">
            <h1 className="text-2xl font-semibold ">Customer</h1>
          </div>
          <div className="w-full inline-flex gap-3 pb-5">
            {/* search */}
            <SearchBar setValue={setSearchBy} setPage={setPageNumber} />
            {/* status */}
            <Select
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={userStatusList}
              selected={filterObj.Status}
              filter={filter}
              filterName="Status"
              width={'w-[13em]'}
            />
            {/* gender */}
            <Select
              icon={<BsGenderAmbiguous className="w-6 h-6 text-gray-500" />}
              name="Gender"
              data={genderList}
              selected={filterObj.Gender}
              filter={filter}
              filterName="Gender"
              width={'w-[13em]'}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-100">
          {/* table */}
          <Table
            columns={columns}
            data={data?.data.data}
            total={totalResults}
            isSuccess={isSuccess}
            queryPageIndex={pageNumber - 1}
            setQueryPageIndex={setPageNumber}
            queryPageSize={pageSize}
            setQueryPageSize={setPageSize}
            isLoading={isLoading}
            filterObj={filterObj}
            isFetching={isFetching}
          />
        </div>
      </div>

      <Modal
        open={banModal.open}
        title={`You are about to ${
          banModal.status === 'Active' ? 'ban' : 'activate'
        } this
            account`}
        description={
          banModal.status === 'Active'
            ? 'This will ban this account.'
            : 'This will activate this account'
        }
        btnCancel={{
          name: 'Cancel',
          class: 'btn btn-ghost',
          onClick: closeBanModal,
        }}
        btnOK={{
          name: banModal.status === 'Active' ? 'Ban' : 'Activate',
          class: `btn border-0 px-6 ${
            banModal.status === 'Active'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`,
          onClick: closeBanModal,
        }}
      />
    </Layout>
  );
};

export default Customer;
