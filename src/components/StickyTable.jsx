import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSticky } from 'react-table-sticky';

import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';
import { Styles } from './TableStyles';

const StickyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    useSticky,
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  const { rows } = getRowModel();
  const firstPageRows = rows.slice(0, 10);

  return (
    <Styles>
      <div className="table sticky" style={{ width: 1000, height: 500 }}>
        <div className="header">
          {getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="tr">
              {headerGroup.headers.map((header) => (
                <div key={header.id} className="th">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="body">
          {firstPageRows.map((row) => {
            return (
              <div key={row.id} className="tr">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {/* <div className="footer">
          {getFooterGroups().map((footerGroup) => (
            <div key={footerGroup.id} className="tr">
              {footerGroup.headers.map((header) => (
                <div key={header.id} className="td">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ))}
            </div>
          ))}
        </div> */}
      </div>
    </Styles>

    // <table>
    //   <thead>
    //     {getHeaderGroups().map((headerGroup) => (
    //       <tr key={headerGroup.id}>
    //         {headerGroup.headers.map((header) => (
    //           <th key={header.id}>
    //             {flexRender(
    //               header.column.columnDef.header,
    //               header.getContext()
    //             )}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>

    //   <tbody>
    //     {getRowModel().rows.map((row) => (
    //       <tr key={row.id}>
    //         {row.getVisibleCells().map((cell) => (
    //           <td key={cell.id}>
    //             {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //           </td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>

    //   <tfoot>
    //     {getFooterGroups().map((footerGroup) => (
    //       <tr key={footerGroup.id}>
    //         {footerGroup.headers.map((header) => (
    //           <th key={header.id}>
    //             {flexRender(
    //               header.column.columnDef.header,
    //               header.getContext()
    //             )}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </tfoot>
    // </table>
  );
};

export default StickyTable;
