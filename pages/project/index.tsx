import Layout from '@components/layouts/layout';
import SearchBar from '@components/search-bar';
import MultipleSelect from '@components/multiple-select';
import { ProjectFilter } from '@services/project.service';
import { useState } from 'react';

import { BsTags } from 'react-icons/bs';
import { MdOutlineDateRange } from 'react-icons/md';
import DatePicker from '@components/date-range-picker';

const Project = () => {
  // data
  const [statusList, setStatusList] = useState([
    'abc',
    'efg',
    'hijjjjjjjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddd',
  ]);

  const [selectionRange, setSelectionRange] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // filter
  const [filter, setFilter] = useState<ProjectFilter>({
    Status: null,
    CreateDate: null,
  });
  const [sortObj, setSortObj] = useState<any>(null);

  // search
  const [searchBy, setSearchBy] = useState('');
  const [page, setPage] = useState<SearchType>({
    no: 1,
    size: 30,
  });

  return (
    <Layout>
      <div className="pt-10">
        <div className="px-10">
          <div className="flex justify-between items-center border-b-2 border-gray-100 mb-5 pb-5">
            <h1 className="text-2xl font-semibold ">Project</h1>
          </div>
          <div className="w-full inline-flex gap-3 border-b-2 border-gray-100 mb-5 pb-5">
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
              value={filter.Status}
              onChange={null}
            />
            {/* age */}
          </div>
        </div>

        <div>{/* table */}</div>
      </div>
    </Layout>
  );
};

export default Project;
