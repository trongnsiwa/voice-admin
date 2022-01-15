import Layout from '@components/layouts/layout';
import SearchBar from '@components/search-bar';
import MultipleSelect from '@components/multiple-select';
import { ProjectFilter } from '@services/project.service';
import DatePicker from '@components/date-range-picker';
import { useMemo, useState } from 'react';

import { BsTags } from 'react-icons/bs';
import { MdOutlineDateRange } from 'react-icons/md';
import { GiAges } from 'react-icons/gi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import Table from '@components/table';
import { Project, projects } from 'models/project.model';
import dayjs from 'dayjs';
import { getLabelByStatus, statusColor } from 'models/project-status.model';
import { Column } from 'react-table';
import Link from 'next/link';

const Project = () => {
  // status
  const [statusList, setStatusList] = useState<StatusType[]>([
    { name: 'Waiting', label: 'Waiting' },
    { name: 'Pending', label: 'Pending' },
    { name: 'In-progress', label: 'Process' },
    { name: 'Done', label: 'Done' },
    { name: 'Deleted', label: 'Delete' },
    { name: 'Denied', label: 'Deny' },
  ]);

  // age
  const [ageList, setAgeList] = useState<AgeType[]>([
    { startAge: 18, endAge: 25, label: '15 - 25 years old' },
    { startAge: 26, endAge: 33, label: '26 - 33 years old' },
    { startAge: 34, endAge: 41, label: '34 - 41 years old' },
    { startAge: 42, endAge: 49, label: '42 - 49 years old' },
    { startAge: 50, endAge: 57, label: '50 - 57 years old' },
    { startAge: 57, endAge: 64, label: '57 - 64 years old' },
  ]);

  // price
  const [priceList, setPriceList] = useState<PriceType[]>([
    { startPrice: 10000, endPrice: 50000, label: '10.000đ - 50.000đ' },
    { startPrice: 50000, endPrice: 100000, label: '50.000đ - 100.000đ' },
    { startPrice: 100000, endPrice: 500000, label: '100.000d - 500.000đ' },
    { startPrice: 500000, endPrice: 1000000, label: '500.000d - 1.000.000đ' },
    {
      startPrice: 1000000,
      endPrice: 2000000,
      label: '1.000.000d - 2.000.000đ',
    },
    {
      startPrice: 2000000,
      endPrice: 5000000,
      label: '2.000.000đ - 5.000.000đ',
    },
  ]);

  // created date
  const [selectionRange, setSelectionRange] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // filter
  // const [filter, setFilter] = useState<ProjectFilter>({
  //   Status: null,
  //   CreateDate: null,
  // });
  const [sortObj, setSortObj] = useState<any>(null);

  // search
  const [searchBy, setSearchBy] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  // table
  const [data, setData] = useState(projects);
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Customer',
        accessor: 'poster.firstName',
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const project = original as Project;

          return (
            <div className="flex flex-row items-center">
              <div className="avatar hidden mr-3 md:block">
                <div className="rounded-full w-10 h-10">
                  <img src={project.poster.avatar} alt="User image" />
                </div>
              </div>

              <div>
                <p className="text-sm">{`${project.poster.lastName} ${project.poster.firstName}`}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Created',
        accessor: 'createDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm ">
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
          </span>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Age',
        accessor: 'minAge',
        Cell: ({ cell }) => {
          const { original } = cell.row;
          const project = original as Project;

          return (
            <span className="text-sm ">
              {project.minAge} - {project.maxAge}
            </span>
          );
        },
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
      {
        Header: 'Response',
        accessor: 'responseDeadline',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {' '}
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
          </span>
        ),
      },
      {
        Header: 'Deadline',
        accessor: 'projectDeadline',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {' '}
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
          </span>
        ),
      },
      {
        Header: 'Updated',
        accessor: 'updateDate',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
            {' '}
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
          </span>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => (
          <div className={`badge ${statusColor(value)} text-sm`}>
            {getLabelByStatus(value)}
          </div>
        ),
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Link href={`/project/${value}`} passHref>
            <HiOutlinePencilAlt
              className="w-6 h-6 cursor-pointer text-gray-600"
              title="View Detail"
            />
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="pt-10">
        <div className="px-10">
          <div className="flex justify-between items-center border-b-2 border-gray-100 mb-5 pb-5">
            <h1 className="text-2xl font-semibold ">Project</h1>
          </div>
          <div className="w-full inline-flex gap-3 pb-5">
            {/* search */}
            <SearchBar setValue={setSearchBy} />
            {/* actions */}
            {/* create date */}
            <DatePicker
              icon={<MdOutlineDateRange className="w-6 h-6 text-gray-500" />}
              name="Created Date"
              onChange={null}
              selectionRange={selectionRange}
            />
            {/* status */}
            <MultipleSelect
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={statusList}
              value={null}
              onChange={null}
              width={'w-[13em]'}
            />
            {/* age */}
            <MultipleSelect
              icon={<GiAges className="w-6 h-6 text-gray-500" />}
              name="Age"
              data={ageList}
              value={null}
              onChange={null}
              width={'w-[15em]'}
            />
            {/* price */}
            <MultipleSelect
              icon={<FaRegMoneyBillAlt className="w-6 h-6 text-gray-500" />}
              name="Price"
              data={priceList}
              value={null}
              onChange={null}
              width={'w-[18em]'}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-100">
          {/* table */}
          <Table columns={columns} data={data} total={totalResults} />
        </div>
      </div>
    </Layout>
  );
};

export default Project;
