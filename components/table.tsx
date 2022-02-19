import { usePagination, useSortBy, useTable } from 'react-table';
import { BsSortDown, BsSortUp, BsTags } from 'react-icons/bs';
import { useAppSelector } from '@redux/store/hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import LoadingSpinner from './loading-spinner';
import Select from './select';

interface TableProps {
  columns: any;
  data: any;
  total: number;
  isDetail?: boolean;
  onStatusChange?: (name: string, value: string | null) => void;
  statusList?: any[];
  selectedStatus?: any;
  notFoundMessage?: string;
  hasBottom?: boolean;
  isSuccess: boolean;
  queryPageIndex: number;
  setQueryPageIndex: Dispatch<SetStateAction<number>>;
  queryPageSize: number;
  setQueryPageSize: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isFetching: boolean;
  filterObj: any;
}

const Table = ({
  columns,
  data,
  total,
  isDetail = false,
  onStatusChange,
  statusList,
  selectedStatus,
  notFoundMessage = 'No Result Found',
  hasBottom = true,
  isSuccess = false,
  queryPageIndex,
  setQueryPageIndex,
  queryPageSize,
  setQueryPageSize,
  isLoading = false,
  isFetching = false,
  filterObj,
}: TableProps) => {
  const tableInstance = useTable(
    {
      columns,
      data: isSuccess ? data : [],
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      },
      manualPagination: true,
      pageCount: isSuccess ? Math.ceil(total / queryPageSize) : 0,
      disableSortBy: data?.length === 0 || !isSuccess,
      autoResetHiddenColumns: false,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    setQueryPageIndex(pageIndex + 1);
  }, [pageIndex, previousPage, nextPage, gotoPage]);

  useEffect(() => {
    setQueryPageSize(pageSize);
    gotoPage(0);
  }, [pageSize]);

  useEffect(() => {
    gotoPage(0);
  }, [filterObj]);

  const paginationButtons = (
    <div>
      <button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage || isLoading}
        className="btn btn-sm"
      >
        {'<<'}
      </button>{' '}
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage || isLoading}
        className="btn btn-sm"
      >
        {'<'}
      </button>{' '}
      <span className="px-3">{pageIndex + 1}</span>{' '}
      <button
        onClick={() => nextPage()}
        disabled={!canNextPage || isLoading}
        className="btn btn-sm"
      >
        {'>'}
      </button>{' '}
      <button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage || isLoading}
        className="btn btn-sm"
      >
        {'>>'}
      </button>{' '}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <div className="w-full flex items-center justify-between py-3 px-10">
        <span>
          {!isLoading && !isFetching
            ? `Showing ${pageSize * pageIndex + 1} - 
          ${
            total < pageSize * pageIndex + pageSize
              ? total
              : pageSize * pageIndex + pageSize
          } 
          of ${total} results`
            : null}
        </span>
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          Results per page
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="select select-bordered text-gray-600"
            disabled={data?.length === 0 || page.length === 0 || !isSuccess}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={`size_${pageSize}`} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table
        key={'table'}
        className="table w-full border-t"
        {...getTableProps()}
        style={{ display: 'table' }}
      >
        <thead>
          <tr>
            {headers.map((column, index) => {
              const { key: keyColumn, ...restHeaderProps } =
                column.getHeaderProps(column.getSortByToggleProps());

              return (
                <th
                  key={`header_${keyColumn}`}
                  {...restHeaderProps}
                  className="cursor-pointer px-10"
                  title={
                    (index < headers.length - 1 && !isDetail) || isDetail
                      ? `Sort by ${column.render('Header')}`
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BsSortDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <BsSortUp className="w-5 h-5 text-gray-500" />
                        )
                      ) : (index < headers.length - 1 && !isDetail) ||
                        isDetail ? (
                        <BsSortUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody key={'body'} {...getTableBodyProps()}>
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={headers.length} className="p-10">
                <LoadingSpinner />
              </td>
            </tr>
          ) : data?.length > 0 || page.length > 0 || isSuccess ? (
            page.map((row) => {
              prepareRow(row);

              const { key: keyRow, ...restRowProps } = row.getRowProps();

              return (
                <tr
                  key={`row_${keyRow}`}
                  {...restRowProps}
                  className="border-b"
                >
                  {row.cells.map((cell) => {
                    const { key: keyCell, ...restCellProps } =
                      cell.getCellProps();

                    return (
                      <td
                        key={`cell_${keyCell}`}
                        {...restCellProps}
                        className="px-10"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr className={isDetail ? '' : 'border-b'}>
              <td colSpan={headers.length} className="text-center">
                <img
                  src="https://www.workabroad.ph/assets/img/no-result.svg"
                  alt="No Result Found"
                  className="w-40 h-40 mx-auto"
                />
                <p className="py-5 font-medium text-gray-500">
                  {notFoundMessage}
                </p>
              </td>
            </tr>
          )}
        </tbody>

        {!isDetail && (
          <tfoot className="border-b">
            <tr>
              <td colSpan={headers.length} className="px-10">
                {paginationButtons}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {isDetail && (
        <div
          className={`bg-gray-50 py-3 fixed w-full hidden md:block ${
            hasBottom ? 'bottom-14' : 'bottom-0'
          }`}
        >
          <div
            className={`px-10 flex items-center justify-between ${
              !open ? 'w-[calc(100%-80px)]' : 'w-[calc(100%-280px)]'
            }`}
          >
            {paginationButtons}
            {isDetail && onStatusChange && statusList && statusList.length > 0 && (
              <div>
                <Select
                  icon={<BsTags className="w-6 h-6 text-gray-500" />}
                  name="Status"
                  data={statusList}
                  width={'w-[15em]'}
                  isDetail={isDetail}
                  hasBottom={hasBottom}
                  filter={onStatusChange}
                  filterName="Status"
                  selected={selectedStatus}
                  disabled={
                    data?.length === 0 || page.length === 0 || !isSuccess
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
