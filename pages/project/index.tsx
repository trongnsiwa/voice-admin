import Layout from '@components/layouts/layout';
import SearchBar from '@components/search-bar';
import { getProjects, ProjectFilterObject } from '@services/project.service';
import { useEffect, useMemo, useState } from 'react';

import { BsTags } from 'react-icons/bs';
import {
  MdOutlineDateRange,
  MdOutlinePriceChange,
  MdPriceChange,
} from 'react-icons/md';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import Table from '@components/table';
import { Project } from 'models/project.model';
import dayjs from 'dayjs';
import {
  getLabelByStatus,
  projectStatusList,
} from 'models/project-status.model';
import { Column } from 'react-table';
import Link from 'next/link';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import Select from '@components/select';
import DatePicker from '@components/date-picker';
import Input from '@components/input';
import { AiFillFilter } from 'react-icons/ai';
import { parseInt } from 'lodash';

const Project = () => {
  // filter
  const [filterObj, setFilterObj] = useState<ProjectFilterObject>({
    Status: null,
    PriceMin: null,
    PriceMax: null,
    CreateDate: null,
  });
  const [selectedCreatedDate, setSelectedCreatedDate] = useState<DayValue>();
  const [selectedPrice, setSelectedPrice] = useState<{
    error: boolean;
    PriceMin: string | null;
    PriceMax: string | null;
  }>({
    error: false,
    PriceMin: null,
    PriceMax: null,
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
      searchBy.trim(),
      filterObj,
      sortObj,
    ],
    () => {
      let dateCreated = null;
      if (filterObj.CreateDate != null) {
        dateCreated = new Date(
          new Date(filterObj.CreateDate).setHours(0, 0, 0, 0)
        );
        dateCreated = new Date(
          dateCreated.getTime() - dateCreated.getTimezoneOffset() * 60000
        ).toJSON();
      }

      return getProjects(pageNumber, pageSize, searchBy, sortObj, {
        ...filterObj,
        CreateDate: dateCreated,
      });
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

  useEffect(() => {
    setPageNumber(1);
  }, [filterObj]);

  const filter = (name: string, value: string | null) => {
    switch (name) {
      case 'Status':
        setFilterObj({
          ...filterObj,
          Status: value,
        });
        break;
    }

    setPageNumber(1);
  };

  // table
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
      },
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
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
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
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        disableFilters: true,
        defaultCanSort: false,
        Cell: ({ cell: { value } }) => {
          const className = classNames(
            'badge',
            {
              'bg-violet-100 text-violet-700 border-none': value === 'Waiting',
              'badge-warning': value === 'Pending',
              'bg-green-100 text-green-700 border-none': value === 'Done',
              'badge-error': value === 'Delete' || value === 'Deny',
              'badge-info': value === 'Process',
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
          <div className="flex justify-between items-center pb-5">
            <h1 className="text-2xl font-semibold ">Project</h1>
          </div>
          <div className="w-full inline-flex gap-3 pb-5">
            {/* search */}
            <SearchBar setValue={setSearchBy} setPage={setPageNumber} />
            {/* actions */}
            {/* create date */}
            <DatePicker
              icon={<MdOutlineDateRange className="w-6 h-6 text-gray-500" />}
              name="Created Date"
              date={selectedCreatedDate}
              onChange={(date) => {
                setSelectedCreatedDate(date);
                setFilterObj({
                  ...filterObj,
                  CreateDate: date
                    ? new Date(
                        date.year,
                        date.month - 1,
                        date.day
                      ).toUTCString()
                    : null,
                });
                setPageNumber(1);
              }}
              reset={() => {
                setSelectedCreatedDate(null);
                setFilterObj({
                  ...filterObj,
                  CreateDate: null,
                });
              }}
            />
            {/* status */}
            <Select
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={projectStatusList}
              selected={filterObj.Status}
              filter={filter}
              filterName="Status"
              width={'w-[13em]'}
            />
            <div className="border-l border-gray-300"></div>
            {/* price */}
            <Input
              type="number"
              placeholder="Min Price"
              value={selectedPrice.PriceMin}
              onChange={(e) => {
                const value = parseInt(e.target.value);

                if (
                  value < 0 ||
                  (selectedPrice.PriceMax &&
                    value > parseInt(selectedPrice.PriceMax))
                ) {
                  setSelectedPrice({
                    ...selectedPrice,
                    error: true,
                  });
                }

                setSelectedPrice({
                  ...selectedPrice,
                  PriceMin: value.toString(),
                });
              }}
              icon={<MdOutlinePriceChange className="w-6 h-6 text-gray-500" />}
              width={'w-[10rem]'}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={selectedPrice.PriceMax}
              onChange={(e) => {
                const value = parseInt(e.target.value);

                if (
                  value < 0 ||
                  (selectedPrice.PriceMin &&
                    value < parseInt(selectedPrice.PriceMin))
                ) {
                  setSelectedPrice({
                    ...selectedPrice,
                    error: true,
                  });
                }

                setSelectedPrice({
                  ...selectedPrice,
                  PriceMax: value.toString(),
                });

                console.log(typeof value);
                console.log(selectedPrice.error);
              }}
              icon={<MdPriceChange className="w-6 h-6 text-gray-500" />}
              width={'w-[10rem]'}
            />
            <button
              type="button"
              className="btn btn-primary btn-outline border-gray-300"
              onClick={() => {
                setFilterObj({
                  ...filterObj,
                  PriceMin: selectedPrice.PriceMin,
                  PriceMax: selectedPrice.PriceMax,
                });
                setSelectedPrice({
                  ...selectedPrice,
                  error: false,
                });
                setPageNumber(1);
              }}
              disabled={
                selectedPrice.error ||
                (selectedPrice.PriceMin
                  ? parseInt(selectedPrice.PriceMin) === 0
                  : undefined) ||
                (selectedPrice.PriceMax
                  ? parseInt(selectedPrice.PriceMax) === 0
                  : undefined)
              }
            >
              <AiFillFilter size="20" />
            </button>
            {selectedPrice.error && (
              <p className="text-error text-sm">Invalid price</p>
            )}
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
            isLoading={isLoading || isFetching}
            filterObj={filterObj}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Project;
