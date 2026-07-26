'use client';

import $ from 'jquery';
import 'jquery-highlight';

import DataTable from 'datatables.net-react';
import DataTablesCore from 'datatables.net-bs5';

import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-columncontrol-bs5';

import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import 'datatables.net-columncontrol-bs5/css/columnControl.bootstrap5.css';

import 'datatables.net-plugins/features/searchHighlight/dataTables.searchHighlight.mjs';

DataTable.use(DataTablesCore);

DataTablesCore.ColumnControl.SearchInput.prototype.runSearch = function () {
  return;
};

export default function DataTableComponent(props) {
  return <DataTable {...props} />;
}
