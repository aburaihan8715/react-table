import { format } from 'date-fns';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import './table.css';
import MOCK_DATA from './MOCK_DATA.json';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const columnHelper = createColumnHelper();

const ROW_SELECTION_COLUMNS = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  columnHelper.accessor('id', {
    header: 'Id',
    footer: 'Id',
  }),
  columnHelper.accessor('first_name', {
    header: 'First Name',
    footer: 'First Name',
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    footer: 'Last Name',
  }),
  columnHelper.accessor('date_of_birth', {
    header: 'Date of Birth',
    footer: 'Date of Birth',
    cell: ({ getValue }) => format(new Date(getValue()), 'dd/MM/yyyy'),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    footer: 'Age',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    footer: 'Phone',
  }),
];

const RowSelectionTable = () => {
  const columns = useMemo(() => ROW_SELECTION_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [rowSelection, setRowSelection] = useState({});

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),

    state: {
      rowSelection,
    },

    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  const { getHeaderGroups, getRowModel, getState } = tableInstance;
  const { rows } = getRowModel();
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
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
          <tr>
            <td>
              <IndeterminateCheckbox
                {...{
                  checked: getIsAllPageRowsSelected(),
                  indeterminate: getIsSomePageRowsSelected(),
                  onChange: getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td colSpan={20}>Page Rows ({getRowModel().rows.length})</td>
          </tr>
        </tfoot> */}
      </table>
      <div>
        <label>Row Selection State:</label>
        <pre>{JSON.stringify(getState().rowSelection, null, 2)}</pre>
      </div>
    </>
  );
};

export default RowSelectionTable;
