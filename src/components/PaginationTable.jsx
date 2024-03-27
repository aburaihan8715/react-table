import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import './table.css';
import MOCK_DATA from './MOCK_DATA.json';
import { GROUP_COLUMNS } from './columns';

import GlobalFilterInput from './GlobalFilterInput';

const PaginationTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [pagination, setPagination] = useState({
    // pageIndex: 2,
    pageIndex: 0,
    pageSize: 10,
  });

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
      // NOTE: After activating pagination column filtering is not work as no need column filtering
      // columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    nextPage,
    getCanNextPage,
    getCanPreviousPage,
    getState,
    getPageCount,
    firstPage,
    lastPage,
    setPageIndex,
    setPageSize,
  } = tableInstance;

  return (
    <>
      <GlobalFilterInput
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <span>
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </span>
                      </div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div>
        <span>
          Page{' '}
          <strong>
            {getState().pagination.pageIndex + 1} of{' '}
            {getPageCount().toLocaleString()}{' '}
          </strong>
        </span>

        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            style={{ width: '50px' }}
          />
        </span>

        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <button onClick={() => firstPage()} disabled={!getCanPreviousPage()}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          Next
        </button>
        <button onClick={() => lastPage()} disabled={!getCanNextPage()}>
          {'>>'}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
