import Layout from '@components/layouts/layout';
import Modal from '@components/modal';
import MultipleSelect from '@components/multiple-select';
import SearchBar from '@components/search-bar';
import Table from '@components/table';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ratingList } from 'models/artist.model';
import { Customer, customers } from 'models/customer.model';
import { genderList } from 'models/gender.model';
import { userStatusList, getStatusByName } from 'models/user-status.model';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { BsGenderAmbiguous, BsStar, BsTags } from 'react-icons/bs';
import {
  HiOutlineBan,
  HiOutlineCheckCircle,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import { Column } from 'react-table';
import { useOnClickOutside } from 'usehooks-ts';

const Customer = () => {
  // data
  const [data, setData] = useState<Customer[]>(customers);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 30;

  const [totalResults, setTotalResults] = useState(0);

  // modal
  const [banModal, updateBanModal] = useState<BanModalType>({
    open: false,
    selected: null,
    status: null,
  });
  const banModalRef = useRef(null);

  // filter
  // const [filterObj, setFilterObj] = useState<CustomerFilterObject>({
  //   Status: null,
  //   Gender: null,
  // });
  const [sortObj, setSortObj] = useState<any>(null);

  // search
  const [searchBy, setSearchBy] = useState('');

  //  const loadData = () => {
  //     getCustomers(page, resultsPerPage, searchBy.trim(), sortObj, filterObj)
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
  //   };

  //    useEffect(() => {
  //     // setData(creators.slice((page - 1) * resultsPerPage, page * resultsPerPage));

  //     loadData();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [page, searchBy, sortObj, filterObj]);

  //    function onPageChange(p: any) {
  //     setPage(p);
  //   }

  //   const banUser = () => {
  //     if (banModal.selected == null || banModal.status == null) {
  //       return;
  //     }

  //     dispatch(showLoader());

  //     const changedStatus = banModal.status === 'Activated' ? 1 : 0;
  //     console.log(changedStatus);

  //     changeStatusOfCustomer(banModal.selected, changedStatus)
  //       .then((res) => {
  //         dispatch(hideLoader());
  //         NotificationManager.success(
  //           banModal.status === 'Activated' ? SUCCESS.BAN_USER_SUCCESS : SUCCESS.UNBAN_USER_SUCCESS,
  //           'Thành công',
  //           1000
  //         );
  //         updateBanModal({
  //           open: false,
  //           selected: null,
  //           status: null,
  //         });
  //         loadData();
  //       })
  //       .catch((err) => {
  //         showStoreErrorMessage(err, dispatch);
  //       });
  //   };

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
        Header: 'Username',
        accessor: 'username',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
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
        Header: 'Created',
        accessor: 'createdDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
          </span>
        ),
      },
      {
        Header: 'Updated',
        accessor: 'updatedDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
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
              'badge-success bg-success text-success-dark': value === 'Active',
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
            <SearchBar setValue={setSearchBy} />
            {/* status */}
            <MultipleSelect
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={userStatusList}
              value={null}
              onChange={null}
              width={'w-[13em]'}
            />
            {/* gender */}
            <MultipleSelect
              icon={<BsGenderAmbiguous className="w-6 h-6 text-gray-500" />}
              name="Gender"
              data={genderList}
              value={null}
              onChange={null}
              width={'w-[13em]'}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-100">
          {/* table */}
          <Table columns={columns} data={data} total={totalResults} />
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
