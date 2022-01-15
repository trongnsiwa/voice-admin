import { usePagination, useSortBy, useTable } from 'react-table';
import { BsSortDown, BsSortUp } from 'react-icons/bs';

interface TableProps {
  columns: any;
  data: any;
  total: number;
}

const Table = ({ columns, data, total }: TableProps) => {
  const tableInstance = useTable(
    { columns, data, manualPagination: true },
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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = tableInstance;

  return (
    <div className="overflow-x-auto">
      <div className="w-full flex items-center justify-between py-3 px-10">
        <span>
          Showing {pageSize * pageIndex + 1} -{' '}
          {total < pageSize * pageIndex + pageSize
            ? total
            : pageSize * pageIndex + pageSize}{' '}
          of {total} results
        </span>
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          Results per page
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="select select-bordered text-gray-600"
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table w-full border-t" {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column, index) => (
              // eslint-disable-next-line react/jsx-key
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="cursor-pointer px-10"
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
                    ) : index < headers.length - 1 ? (
                      <BsSortUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()} className="border-b">
                    {row.cells.map((cell) => {
                      return (
                        <>
                          <td {...cell.getCellProps()} className="px-10">
                            {cell.render('Cell')}
                          </td>
                        </>
                      );
                    })}
                  </tr>
                </>
              );
            })
          ) : (
            <tr className="border-b">
              <td colSpan={headers.length - 1} className="text-center">
                <img
                  src="https://www.workabroad.ph/assets/img/no-result.svg"
                  alt="No Result Found"
                  className="w-40 h-40 mx-auto"
                />
                <p className="py-5 font-medium text-gray-500">
                  No Result Found
                </p>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className="border-b">
          <tr>
            <td colSpan={headers.length - 1} className="px-10">
              <div>
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="btn btn-sm"
                >
                  {'<<'}
                </button>{' '}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="btn btn-sm"
                >
                  {'<'}
                </button>{' '}
                <span className="px-3">{pageIndex + 1}</span>{' '}
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="btn btn-sm"
                >
                  {'>'}
                </button>{' '}
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className="btn btn-sm"
                >
                  {'>>'}
                </button>{' '}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
