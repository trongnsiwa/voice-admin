import Layout from '@components/layouts/layout';
import SearchBar from '@components/search-bar';
import MultipleSelect from '@components/multiple-select';
import { getProjects } from '@services/project.service';
import DatePicker from '@components/date-range-picker';
import { useEffect, useMemo, useState } from 'react';

import { BsTags } from 'react-icons/bs';
import { MdOutlineDateRange } from 'react-icons/md';
import { GiAges } from 'react-icons/gi';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import Table from '@components/table';
import { ageList, Project } from 'models/project.model';
import dayjs from 'dayjs';
import {
  getLabelByStatus,
  projectStatusList,
} from 'models/project-status.model';
import { Column } from 'react-table';
import Link from 'next/link';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { RangeKeyDict } from 'react-date-range';

const Project = () => {
  // filter
  const [filterStatusList, setFilterStatusList] = useState<string[]>([]);
  const [filterAgeList, setFilterAgeList] = useState<string[]>([]);
  const [selectionRange, setSelectionRange] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // sort
  const [sortObj, setSortObj] = useState<any>(null);

  // search
  const [searchBy, setSearchBy] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const { isLoading, error, data, isSuccess, isFetching } = useQuery(
    [
      'fetchProjects',
      pageNumber,
      pageSize,
      searchBy,
      sortObj,
      selectionRange,
      filterStatusList,
      filterAgeList,
    ],
    () => {
      let createdStartDate = null;
      let createdEndDate = null;

      if (selectionRange.startDate != null) {
        createdStartDate = new Date(
          new Date(selectionRange.startDate).setHours(0, 0, 0, 0)
        );
        createdStartDate = new Date(
          createdStartDate.getTime() -
            createdStartDate.getTimezoneOffset() * 60000
        ).toJSON();
      }

      if (selectionRange.endDate != null) {
        createdEndDate = new Date(
          new Date(selectionRange.endDate).setHours(0, 0, 0, 0)
        );
        createdEndDate = new Date(
          createdEndDate.getTime() - createdEndDate.getTimezoneOffset() * 60000
        ).toJSON();
      }

      return getProjects(
        pageNumber,
        pageSize,
        searchBy,
        sortObj,
        createdStartDate,
        createdEndDate,
        filterStatusList,
        filterAgeList
      );
    },
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

  const filterStatus = (value: string, isClear: boolean) => {
    let search: string[] = [];

    if (isClear) {
      search = filterStatusList.filter((status: string) => status !== value);
    } else {
      search = [...filterStatusList, value];
    }

    setFilterStatusList(search);
  };

  const filterAge = (value: string, isClear: boolean) => {
    let search: string[] = [];

    if (isClear) {
      search = filterAgeList.filter((age: string) => age !== value);
    } else {
      search = [...filterAgeList, value];
    }

    setFilterAgeList(search);
  };

  // table
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
          <span className="text-sm">
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
        Header: 'Response',
        accessor: 'responseDeadline',
        Cell: ({ cell: { value } }) => (
          <span className="text-sm">
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
            {dayjs(new Date(value as Date).toLocaleDateString()).format(
              'DD/MM/YYYY'
            )}
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
      <div className="pt-28">
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
              onChange={(value: RangeKeyDict) => {
                setSelectionRange({
                  startDate: value.range1.startDate,
                  endDate: value.range1.endDate,
                });
              }}
              selectionRange={selectionRange}
            />
            {/* status */}
            <MultipleSelect
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={projectStatusList}
              selectedList={filterStatusList}
              filter={filterStatus}
              setPage={setPageNumber}
              width={'w-[13em]'}
            />
            {/* age */}
            <MultipleSelect
              icon={<GiAges className="w-6 h-6 text-gray-500" />}
              name="Age"
              data={ageList}
              selectedList={filterAgeList}
              filter={filterAge}
              setPage={setPageNumber}
              width={'w-[15em]'}
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
            setSortObj={setSortObj}
            isLoading={isLoading || isFetching}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Project;
