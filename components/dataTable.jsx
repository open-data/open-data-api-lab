'use client';

import $ from 'jquery';
import 'jquery-highlight';

import DataTable from 'datatables.net-react';
import DataTablesCore from 'datatables.net-bs5';

import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-plugins/features/searchHighlight/dataTables.searchHighlight.mjs';

DataTable.use(DataTablesCore);

export default function DataTableComponent(props) {
  return <DataTable {...props} />;
}
