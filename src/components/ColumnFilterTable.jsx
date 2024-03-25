import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import './table.css';
import MOCK_DATA from './MOCK_DATA.json';
import { GROUP_COLUMNS } from './columns';

import GlobalFilterInput from './GlobalFilterInput';
import ColumnFilterInput from './ColumnFilterInput';

const ColumnFilterTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

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

                      {header.column.getCanFilter() ? (
                        <div>
                          <ColumnFilterInput
                            column={header.column}
                            table={tableInstance}
                          />
                        </div>
                      ) : null}
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

        <tfoot>
          {getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default ColumnFilterTable;
