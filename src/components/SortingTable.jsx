import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import MOCK_DATA from './MOCK_DATA.json';
import { GROUP_COLUMNS } from './columns';
import './table.css';

const SortingTable = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
              >
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

export default SortingTable;
