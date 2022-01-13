import Layout from '@components/layouts/layout';
import SearchBar from '@components/search-bar';
import Select from '@components/select';
import { ProjectFilter } from '@services/project.service';
import { useState } from 'react';

import { BsTags } from 'react-icons/bs';

const Project = () => {
  // data
  const [statusList, setStatusList] = useState(['abc', 'efg', 'hij']);

  // filter
  const [filter, setFilter] = useState<ProjectFilter>({
    Status: null,
    PriceMin: null,
    PriceMax: null,
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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-5">Project</h1>
          </div>
          <div className="w-full inline-flex gap-3 mb-5">
            {/* search */}
            <SearchBar setValue={setSearchBy} />
            {/* actions */}
            <Select
              icon={<BsTags className="w-6 h-6" />}
              name="status"
              data={statusList}
              value={filter.Status}
              onChange={(e) => {
                const value = e.target.value;

                if (value.toLowerCase() !== 'all') {
                  setFilter({
                    ...filter,
                    Status: value || null,
                  });
                } else {
                  setFilter({
                    ...filter,
                    Status: null,
                  });
                }
              }}
            />
          </div>
        </div>

        <div>{/* table */}</div>
      </div>
    </Layout>
  );
};

export default Project;
