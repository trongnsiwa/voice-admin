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
import Table from '@components/table';

const Project = () => {
  // status
  const [statusList, setStatusList] = useState<StatusType[]>([
    { name: 'abc', label: 'abc' },
    { name: 'abc', label: 'abc' },
    { name: 'abc', label: 'abc' },
  ]);

  // age
  const [ageList, setAgeList] = useState<AgeType[]>([
    { startAge: 10, endDate: 10, label: '10 - 10' },
    { startAge: 10, endDate: 10, label: '10 - 10' },
    { startAge: 10, endDate: 10, label: '10 - 10' },
  ]);

  // price
  const [priceList, setPriceList] = useState<PriceType[]>([
    { startPrice: 10, endPrice: 10, label: '10 - 10' },
    { startPrice: 10, endPrice: 10, label: '10 - 10' },
    { startPrice: 10, endPrice: 10, label: '10 - 10' },
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
  const [page, setPage] = useState<SearchType>({
    no: 1,
    size: 30,
  });

  // table
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
        Cell: ({ cell: { value } }) => <></>,
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
      {
        Header: 'Column 3',
        accessor: 'col3',
      },
      {
        Header: 'Column 4',
        accessor: 'col4',
      },
      {
        Header: 'Column 5',
        accessor: 'col5',
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
            />
            {/* age */}
            <MultipleSelect
              icon={<GiAges className="w-6 h-6 text-gray-500" />}
              name="Age"
              data={ageList}
              value={null}
              onChange={null}
            />
            {/* price */}
            <MultipleSelect
              icon={<FaRegMoneyBillAlt className="w-6 h-6 text-gray-500" />}
              name="Price"
              data={priceList}
              value={null}
              onChange={null}
            />
          </div>
        </div>

        <div className="border-t-2 border-gray-100">
          {/* table */}
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Project;
