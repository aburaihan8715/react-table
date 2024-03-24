import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

const columnHelper = createColumnHelper();

export const COLUMNS = [
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
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    footer: 'Country',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    footer: 'Phone',
  }),
];

export const GROUP_COLUMNS = [
  columnHelper.group({
    header: 'Name',
    footer: 'Name',
    columns: [
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
    ],
  }),
  columnHelper.group({
    header: 'Info',
    footer: 'Info',
    columns: [
      columnHelper.accessor('date_of_birth', {
        header: 'Date of Birth',
        footer: 'Date of Birth',
        cell: ({ getValue }) => format(new Date(getValue()), 'dd/MM/yyyy'),
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        footer: 'Country',
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        footer: 'Phone',
      }),
    ],
  }),
];
