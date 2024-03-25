import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import MOCK_DATA from './MOCK_DATA.json';
import { GROUP_COLUMNS } from './columns';
import './table.css';

const HeaderGroupTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
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
  );
};

export default HeaderGroupTable;
