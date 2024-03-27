import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';

const ColumnOrderingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [columnOrder, setColumnOrder] = useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
  });

  const { getHeaderGroups, getRowModel, getFooterGroups } = tableInstance;
  const { rows } = getRowModel();
  const firstPageRows = rows.slice(0, 10);

  const changeOrder = () => {
    tableInstance.setColumnOrder([
      'id',
      'first_name',
      'last_name',
      'phone',
      'age',
      'date_of_birth',
    ]);
  };

  return (
    <>
      <button onClick={() => changeOrder()}>Change Order</button>
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

        <tfoot>
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
        </tfoot>
      </table>
    </>
  );
};

export default ColumnOrderingTable;
