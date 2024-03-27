import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';

const ColumnVisibilityTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [columnVisibility, setColumnVisibility] = useState({});

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const {
    getHeaderGroups,
    getRowModel,
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
  } = tableInstance;
  const { rows } = getRowModel();
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <div>
        <div>
          <input
            {...{
              type: 'checkbox',
              checked: getIsAllColumnsVisible(),
              onChange: getToggleAllColumnsVisibilityHandler(),
            }}
          />{' '}
          Toggle All
        </div>
        {getAllLeafColumns().map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {firstPageRows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
        {getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
      </table>
    </>
  );
};

export default ColumnVisibilityTable;
