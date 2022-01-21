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
import { ageList, priceList, Project, projects } from 'models/project.model';
import dayjs from 'dayjs';
import {
  getLabelByStatus,
  projectStatusList,
  statusColor,
} from 'models/project-status.model';
import { Column } from 'react-table';
import Link from 'next/link';
import classNames from 'classnames';

const Project = () => {
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

  // const loadData = () => {
  //   var dateCreated = null;
  //   if (filterObj.CreateDate != null) {
  //     dateCreated = new Date(
  //       new Date(filterObj.CreateDate).setHours(0, 0, 0, 0)
  //     );
  //     dateCreated = new Date(
  //       dateCreated.getTime() - dateCreated.getTimezoneOffset() * 60000
  //     ).toJSON();
  //   }

  //   getProjects(page, resultsPerPage, searchBy, sortObj, {
  //     ...filterObj,
  //     CreateDate: dateCreated,
  //   })
  //     .then((res) => {
  //       if (res.data) {
  //         setData(res.data.data);
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
  // };

  // useEffect(() => {
  //   // setData(projects.slice((page - 1) * resultsPerPage, page * resultsPerPage));

  //   loadData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, searchBy, sortObj, filterObj]);

  // function onPageChange(p: any) {
  //   setPage(p);
  // }

  // table
  const [data, setData] = useState<Project[]>(projects);
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
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => <span className="text-sm">{value}</span>,
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
              onChange={null}
              selectionRange={selectionRange}
            />
            {/* status */}
            <MultipleSelect
              icon={<BsTags className="w-6 h-6 text-gray-500" />}
              name="Status"
              data={projectStatusList}
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
