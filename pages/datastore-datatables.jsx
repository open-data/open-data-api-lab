'use client';

import clsx from 'clsx';
import DataTable from '@/components/dataTableClient';
import { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import Link from 'next/link';
import CodeTabs from '@/components/codeTabs';
import Loader from '@/components/loader';
import { LinkIcon, QuestionIcon } from '@phosphor-icons/react';
import {
  PageMainStyle,
  ContainerMainStyle,
  ContentMainStyle,
  PageLinkStyle,
  PageBreakStyle,
  LinkIconStyle,
} from '@/utils/classNames';
import { WarningIcon } from '@phosphor-icons/react';
import { API_BASE_URI } from '@/utils/constants';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';
import { ckan_action_api } from '@/utils/functions';
import { API_KEY } from '@/utils/constants';

export default function EmbedDataTablesPage(props) {
  // START: static table example
  const static_table_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  fetch('${API_BASE_URI}/data/api/action/datastore_search?resource_id=04cbec5c-5a3d-4d34-927d-e41c9e6e3736&limit=32000')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== '_id').map(_f => ({
        title: _f.id,
        data: _f.id
      }));
      new DataTable('#example', {
        data: data.result.records,
        columns: columns,
        processing: false,
        serverSide: false,
        search: {return: true},
        scrollX: true,
        scrollY: '448px',
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim(),
    },
  ];

  const [staticTableData, setStaticTableData] = useState({
    data: [],
    columns: [],
  });
  useEffect(() => {
    async function load_data() {
      try {
        const response = await ckan_action_api('datastore_search', {
          resource_id: '04cbec5c-5a3d-4d34-927d-e41c9e6e3736',
          limit: 32000,
        });

        setStaticTableData({
          data: response.json.result.records,
          columns: response.json.result.fields
            .filter((f) => f.id !== '_id')
            .map((f) => ({
              title: f.id,
              data: f.id,
            })),
        });
      } catch (err) {
        console.error(err);
      }
    }

    load_data();
  }, []);

  const staticRef = useRef(null);
  const [staticSecHeight, setStaticSecHeight] = useState(null);
  useEffect(() => {
    const staticSec = staticRef.current;
    if (!staticSec) {
      return;
    }
    const updateHeight = () => {
      setStaticSecHeight(staticSec.getBoundingClientRect().height - 196);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(staticSec);
    updateHeight();
    return () => {
      observer.disconnect();
    };
  }, []);
  // END: static table example

  // START: server side table example
  const server_table_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<style>
  /* disable ColumnControl advance selections as DataStore only supports exact matches for filters */
  .dtcc-search-type-icon{display: none !important; pointer-events: none !important;}
  .dtcc-search-type-icon+select{display: none !important; pointer-events: none !important;}
  mark, span.highlight{background: yellow; color: #1f1f1f; padding: 0;}
</style>

<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  fetch('${API_BASE_URI}/data/api/action/datastore_search?resource_id=fac950c0-00d5-4ec1-a4d3-9cbebf98a305&limit=0')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== '_id').map(_f => ({
        title: _f.id,
        data: _f.id,

      }));
      // disable ColumnControl search on keypress, see initComplete for Enter key binding
      DataTable.ColumnControl.SearchInput.prototype.runSearch = function(){ return; }
      const table = new DataTable('#example', {
        columns: columns,
        columnControl: [
          {
            'target': 'thead',
            'content': ['order']
          },
          {
            'target': 'tfoot',
            'content': ['search']
          }
        ],
        processing: true,
        serverSide: true,
        searching: false,  // source has too many records for full-text search
        scrollX: true,
        scrollY: '448px',
        ajax: (_data, _callback) => {
          // convert DataTables components to DataStore parameters
          const limit = _data.length || 10;
          const offset = _data.start || 0;
          const search = encodeURIComponent(_data?.search?.value ?? '');
          const order = _data.order?.[0];
          const sort = order && columns[order.column] ? \`\${columns[order.column].data} \${order.dir}\` : '';  // datastore sort does not support %20 URI encoding for spaces
          const filters = {};
          _data.columns?.forEach((_c) => {
            if (_c.search.value) { filters[_c.data] = _c.search.value; }
          });
          const url = new URL('${API_BASE_URI}/data/api/action/datastore_search');
          url.searchParams.set('resource_id', 'fac950c0-00d5-4ec1-a4d3-9cbebf98a305');
          url.searchParams.set('limit', limit);
          url.searchParams.set('offset', offset);
          if (sort) {
            url.searchParams.set('sort', sort);
          }
          if (Object.keys(filters).length) {
            url.searchParams.set('filters', JSON.stringify(filters));
          }
          if (search) {
            url.searchParams.set('q', search);
          }
          fetch(url)
            .then(r => r.json())
            .then(json => _callback({
              data: json.result.records,
              recordsTotal: json.result.total,
              recordsFiltered: json.result.total
            }));
        },
        initComplete: (_settings, _data) => {
          // add custom Enter key binding for column filter inputs
          const bindColumnSearch = (_column, _input) => {
            $(_input).off('keyup.filterCol');
            $(_input).on('keyup.filterCol', (_event) => {
              const _fVal = $(_input).val();
              if( _event.keyCode == 13 && _column.search() !== _fVal ){
                _column.search(_fVal).draw();
              }
            });
          }
          table.columns().every(function(_i){
            const columnFilter = $(this.footer()).find('input');
            if( columnFilter.length > 0 ){
              bindColumnSearch(this, columnFilter);
              return;
            }
            // re-attempt to bind, due to ColumnControl plugin painting
            const maxTries = 35;
            let interval = false;
            let tries = 0;
            interval = setInterval(() => {
              const columnFilter = $(this.footer()).find('input');
              if( columnFilter.length > 0 || tries > maxTries ){
                clearInterval(interval);
                interval = false;
                bindColumnSearch(this, columnFilter);
                return;
              }
              tries++;
            }, 150);
          });
        },
        drawCallback: (_settings) => {
          // highlight column searches
          if( ! $.fn.unhighlight ){
            return;
          }
          const body = $('#example tbody');
          body.unhighlight();
          table.columns().every(function(_i){
            const search = this.search();
            if( search ){
              $(this.nodes()).highlight(search);
            }
          });
        }
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim(),
    },
  ];

  const [serverTableColumns, setServerTableColumns] = useState([]);
  useEffect(() => {
    async function load_data() {
      try {
        const response = await ckan_action_api('datastore_search', {
          resource_id: 'fac950c0-00d5-4ec1-a4d3-9cbebf98a305',
          limit: 0,
        });

        setServerTableColumns(
          response.json.result.fields
            .filter((f) => f.id !== '_id')
            .map((f) => ({
              title: f.id,
              data: f.id,
            })),
        );
      } catch (err) {
        console.error(err);
      }
    }

    load_data();
  }, []);

  function highlightCell(cell, search) {
    const text = cell.textContent;

    if (!text || !search) {
      return;
    }

    const regex = new RegExp(
      search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'gi',
    );

    cell.innerHTML = text.replace(
      regex,
      (match) => `<mark class="dt-highlight">${match}</mark>`,
    );
  }

  const waitForDataTablesInput = (column, callback) => {
    let tries = 0;
    const maxTries = 30;

    const timer = setInterval(() => {
      const input = column.footer()?.querySelector('input');

      if (input || tries >= maxTries) {
        clearInterval(timer);

        if (input) {
          callback(input);
        }
      }

      tries++;
    }, 100);
  };

  const serverRef = useRef(null);
  const [serverSecHeight, setServerSecHeight] = useState(null);
  useEffect(() => {
    const serverSec = serverRef.current;
    if (!serverSec) {
      return;
    }
    const updateHeight = () => {
      setServerSecHeight(serverSec.getBoundingClientRect().height - 196);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(serverSec);
    updateHeight();
    return () => {
      observer.disconnect();
    };
  }, []);
  // END: server side table example

  // START: data dictionary example
  const data_dictionary_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  const language = document.documentElement.lang || 'en';
  const numberTypes = [
    'year',
    'month',
    'int',
    'int8',
    'int16',
    'bigint',
    'numeric',
    'float',
    'double',
    'money',
  ];
  const alphaTypes = ['text', '_text'];
  const dateTypes = ['timestamp', 'date'];
  fetch('${API_BASE_URI}/data/api/action/datastore_search?resource_id=02a92b0f-b26d-4fbd-9601-d27651703715&limit=32000')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(
        (f) => f.id !== '_id',
      );
      columns.forEach((_c) => {
        _c['data'] = _c.id;
        _c['title'] = _c?.info[\`label_\${language}\`] || _c.id;
        _c['description'] = _c?.info[\`notes_\${language}\`] || null;
        const dsType = _c?.info?.type_override || _c.type;
        if (numberTypes.includes(dsType)) {
          _c['type'] = 'num';
          if( ! ['year_annee', 'month_mois'].includes(_c.id) ){
            _c['render'] = language == 'fr' ? DataTable.render.number(' ', ',', null, null) : DataTable.render.number(',', '.', null, null);
          }
          return;
        }
        if (alphaTypes.includes(dsType)) {
          _c['type'] = 'string';
          return;
        }
        if (dateTypes.includes(dsType)) {
          _c['type'] = 'date';
          return;
        }
      });
      new DataTable('#example', {
        data: data.result.records,
        columns: columns,
        processing: false,
        serverSide: false,
        search: {return: true},
        scrollX: true,
        scrollY: '448px',
        headerCallback: function(_thead){
          this.api().columns().every(function () {
            const columnConfig = columns[this.index()];
            if (!columnConfig?.description) {
              return;
            }
            const th = this.header();
            const title = th.querySelector('.dt-column-title');
            if (!title) {
              return;
            }
            title.querySelector('.column-description-icon')?.remove();
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-question column-description-icon ms-1';
            icon.setAttribute('aria-label', columnConfig.description);
            icon.setAttribute('title', columnConfig.description);
            title.appendChild(icon);
          });
        }
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim(),
    },
  ];

  const numberTypes = [
    'year',
    'month',
    'int',
    'int8',
    'int16',
    'bigint',
    'numeric',
    'float',
    'double',
    'money',
  ];
  const alphaTypes = ['text', '_text'];
  const dateTypes = ['timestamp', 'date'];
  const [dataDictTableData, setDataDictTableData] = useState({
    data: [],
    columns: [],
  });
  useEffect(() => {
    const language = document.documentElement.lang || 'en';
    const numberFormatter =
      language === 'fr'
        ? new Intl.NumberFormat('fr-CA', {
            useGrouping: true,
            maximumFractionDigits: 20,
          })
        : new Intl.NumberFormat('en-CA', {
            useGrouping: true,
            maximumFractionDigits: 20,
          });
    async function load_data() {
      try {
        const response = await ckan_action_api('datastore_search', {
          resource_id: '02a92b0f-b26d-4fbd-9601-d27651703715',
          limit: 32000,
        });
        const columns = response.json.result.fields.filter(
          (f) => f.id !== '_id',
        );
        columns.forEach((_c) => {
          _c['data'] = _c.id;
          _c['title'] = _c?.info[`label_${language}`] || _c.id;
          _c['description'] = _c?.info[`notes_${language}`] || null;
          const dsType = _c?.info?.type_override || _c.type;
          if (numberTypes.includes(dsType)) {
            _c['type'] = 'num';
            if (!['year_annee', 'month_mois'].includes(_c.id)) {
              _c['render'] = (_data, _type) => {
                if (_type !== 'display' && _type !== 'filter') {
                  return _data;
                }
                if (_data == null || _data === '') {
                  return '';
                }
                return numberFormatter.format(Number(_data));
              };
            }
            return;
          }
          if (alphaTypes.includes(dsType)) {
            _c['type'] = 'string';
            return;
          }
          if (dateTypes.includes(dsType)) {
            _c['type'] = 'date';
            return;
          }
        });
        setDataDictTableData({
          data: response.json.result.records,
          columns: columns,
        });
      } catch (err) {
        console.error(err);
      }
    }

    load_data();
  }, []);

  const dataDictRef = useRef(null);
  const [dataDictHeight, setDataDictHeight] = useState(null);
  useEffect(() => {
    const dataDictSec = dataDictRef.current;
    if (!dataDictSec) {
      return;
    }
    const updateHeight = () => {
      setDataDictHeight(dataDictSec.getBoundingClientRect().height - 196);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(dataDictSec);
    updateHeight();
    return () => {
      observer.disconnect();
    };
  }, []);
  // END: data dictionary example

  // START: group table example
  const group_table_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<style>
  .group-header td{ background-color: #335075 !important; color: white !important; box-shadow: none !important; }
  .group-summary td{ background-color: #38414d !important; color: white !important; box-shadow: none !important; }
</style>

<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  const language = document.documentElement.lang || 'en';

  async function retrieveAllRecords(){
    const limit = 10000;
    let offset = 0;
    let records = [];
    let fields;
    while (true) {
      const url = new URL('${API_BASE_URI}/data/api/action/datastore_search');
      url.searchParams.set('resource_id', '15eeafa2-c331-44e7-b37f-d0d54a51d2eb');
      url.searchParams.set('limit', limit);
      url.searchParams.set('offset', offset);
      url.searchParams.set('filters', JSON.stringify({'owner_org': 'ec'}));
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || \`Request failed: \${response.status}\`,
        );
      }
      fields ??= data.result.fields;
      const batch = data.result.records;
      records = records.concat(batch);
      if (batch.length < limit) {
        break;
      }
      offset += limit;
    }
    return { fields, records };
  }

  retrieveAllRecords()
    .then(({ fields, records }) => {
      const columns = fields.filter(_f => _f.id !== '_id' )
        .filter(_f => ! _f.id.endsWith(language == 'en' ? '_fr' : '_en') )  // only show current language columns
        .map((_f) => {
          const column = {
            data: _f.id,
            name: _f.id,  // add name for DataTables API column ":name" selections
            title: _f.id,
          };
          if (_f.id == 'org_name') {
            column.render = (data, type, row) => {
              return data?.split('|')[language === 'en' ? 0 : 1].trim();  // only show current language org name
            };
          }
          return column;
        });
      const html_table = document.querySelector('#example');
      const tfoot = document.createElement('tfoot');
      const footerRow = document.createElement('tr');
      const footer = document.createElement('th');
      footer.setAttribute('colSpan', columns.length);
      footerRow.appendChild(footer);
      tfoot.appendChild(footerRow);
      html_table.appendChild(tfoot);
      const expandedGroups = new Set();
      const table = new DataTable('#example', {
        data: records,
        responsive: false,
        autoWidth: true,
        columns: columns,
        processing: true,
        serverSide: false,
        search: {return: true},
        order: [[0, 'desc']],  // always sort by year descending
        scrollX: true,
        scrollY: '448px',
        pageLength: -1,  // show all results
        lengthChange: false,  // disable "entries per page"
        paging: false,
        ordering: false,
        rowGroup: {
          dataSrc: ['year'],
          startRender: function (rows, group) {
            const expanded = expandedGroups.has(Number(group));
            const columnCount = rows.columns().count();

            const tr = document.createElement('tr');
            tr.className = 'group-header';
            tr.dataset.group = group;

            const td = document.createElement('td');
            td.colSpan = columnCount;

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'group-toggle';
            button.setAttribute('aria-expanded', String(expanded));
            button.setAttribute('aria-label', \`\${expanded ? 'Collapse' : 'Expand'} \${group} group\`);

            const icon = document.createElement('span');
            icon.className = 'group-toggle-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = expanded ? '−' : '+';

            const label = document.createElement('strong');
            label.textContent = group;

            button.append(icon, label);
            td.appendChild(button);
            tr.appendChild(td);

            return tr;
          },
          endRender: function (rows, group) {
            const values = rows.data().pluck('pageviews').toArray().map(Number).filter(Number.isFinite);
            const total = values.reduce((sum, value) => sum + value, 0);
            const average = values.length > 0 ? total / values.length : 0;
            const maximum = values.length > 0 ? Math.max(...values) : 0;

            const columnCount = rows.columns().count();

            const tr = document.createElement('tr');
            tr.className = 'group-summary';

            const labelCell = document.createElement('td');
            labelCell.colSpan = 2;

            const label = document.createElement('strong');
            label.textContent = \`\${group} Summary\`;
            labelCell.appendChild(label);

            const summaryCell = document.createElement('td');
            summaryCell.colSpan = Math.max(columnCount - 2, 1);
            summaryCell.setAttribute('aria-label', \`\${group} summary statistics\`);

            summaryCell.innerHTML = \`
              <span>Total: \${total.toLocaleString()}</span><br>
              <span>Average: \${average.toLocaleString(undefined, {maximumFractionDigits: 2})}</span><br>
              <span>Max: \${maximum.toLocaleString()}</span>
            \`;

            tr.append(labelCell, summaryCell);

            return tr;
          },
        },
        rowCallback: function (row, data) {
          const group = Number(data.year);
          const expanded = expandedGroups.has(group);
          row.hidden = !expanded;
          row.setAttribute('aria-hidden', String(!expanded));
        },
        footerCallback: function () {
          const api = this.api();
          const values = api.column('pageviews:name', { search: 'applied' }).data().toArray().map(Number).filter(Number.isFinite);
          const total = values.reduce((sum, value) => sum + value, 0);
          const average = values.length ? total / values.length : 0;
          const maximum = values.length ? Math.max(...values) : 0;

          const footer = api.table().footer().querySelector('th');

          footer.innerHTML = \`
            <span>Total: \${total.toLocaleString()}</span><br>
            <span>Average: \${average.toLocaleString(undefined, {maximumFractionDigits: 2})}</span><br>
            <span>Max: \${maximum.toLocaleString()}</span>
          \`;
        },
      });
      table.on('click', 'tbody .group-toggle', function (){
        const group = Number(this.closest('tr').dataset.group);
        if (expandedGroups.has(group)) {
          expandedGroups.delete(group);
        } else {
          expandedGroups.add(group);
        }
        table.draw(false);
      });
  }).catch(err => {
    console.error(err);
  });
</script>
  `.trim(),
    },
  ];

  const expandedGroups = useRef(new Set());
  const [groupTableData, setGroupTableData] = useState({
    data: [],
    columns: [],
  });
  useEffect(() => {
    const language = document.documentElement.lang || 'en';

    async function retrieve_all_records() {
      const limit = 10000;
      let offset = 0;
      let records = [];
      let fields;
      while (true) {
        try {
          const response = await ckan_action_api('datastore_search', {
            resource_id: '15eeafa2-c331-44e7-b37f-d0d54a51d2eb',
            limit: limit,
            offset: offset,
            filters: JSON.stringify({ owner_org: 'ec' }),
          });
          fields ??= response.json.result.fields;
          const batch = response.json.result.records;
          records = records.concat(batch);
          if (batch.length < limit) {
            break;
          }
          offset += limit;
        } catch (err) {
          console.error(err);
        }
      }
      return { fields, records };
    }

    async function load_data() {
      retrieve_all_records()
        .then(({ fields, records }) => {
          const columns = fields
            .filter((_f) => _f.id !== '_id')
            .filter((_f) => !_f.id.endsWith(language == 'en' ? '_fr' : '_en'))
            .map((_f) => {
              const column = {
                data: _f.id,
                name: _f.id,
                title: _f.info?.label || _f.id,
              };
              if (_f.id == 'org_name') {
                column.render = (data, type, row) => {
                  return data?.split('|')[language === 'en' ? 0 : 1].trim();
                };
              }
              return column;
            });
          setGroupTableData({
            data: records,
            columns: columns,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    load_data();
  }, []);

  const groupRef = useRef(null);
  const [groupHeight, setGroupHeight] = useState(null);
  useEffect(() => {
    const groupSec = groupRef.current;
    if (!groupSec) {
      return;
    }
    const updateHeight = () => {
      setGroupHeight(groupSec.getBoundingClientRect().height - 196);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(groupSec);
    updateHeight();
    return () => {
      observer.disconnect();
    };
  }, []);
  // END: group table example

  return (
    <>
      <DocHead
        title="DataStore DataTables | Canadian Open Data API Lab"
        description="Use case examples for the Government of Canada Open Data Portal API"
      />
      <AnimatePresence>
        <m.div
          className={clsx(PageMainStyle, 'pb-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'datatables-overview'}
          >
            <div className={ContentMainStyle}>
              <h1>DataTables with DataStore Source</h1>
              <div
                className={clsx(
                  'flex',
                  'items-center',
                  'px-4',
                  'py-2',
                  'rounded-xl',
                  'border-2',
                  'border-ui-white',
                )}
              >
                <WarningIcon size={32} />
                &nbsp;&nbsp;
                <span className={clsx('text-lg')}>
                  <strong>Disclaimer:</strong> only canada.ca and gc.ca domains
                  are allowed to make cross origin requests.
                </span>
              </div>
              <h2>Overview</h2>
              <p>
                <Link
                  className={PageLinkStyle}
                  href={'https://datatables.net'}
                  target={'_blank'}
                >
                  DataTables
                </Link>{' '}
                is a popular open-source JavaScript library that enhances
                standard HTML tables with powerful interactive features. It
                allows for displaying large datasets in a user-friendly way
                without having to build table functionality from scratch. It
                turns a basic HTML table into a feature-rich, interactive data
                grid with minimal configuration.
              </p>
              <p>
                DataTables can populate a table by making AJAX requests to a
                remote API instead of relying on data already present in the
                HTML. This allows it to display dynamic data from a database or
                web service and is especially useful for large or frequently
                changing datasets. The two common approaches are client-side
                processing and server-side processing.
              </p>
              <h3>Download & Install</h3>
              <p>
                DataTables offers a{' '}
                <Link
                  className={PageLinkStyle}
                  href={'https://datatables.net/download/'}
                  target={'_blank'}
                >
                  package builder
                </Link>{' '}
                which will help you gather all of the dependencies you need in
                your webpage.
              </p>
              <h3>DataTables Options</h3>
              <p>
                For detailed descriptions of the DataTables options, read their{' '}
                <Link
                  className={PageLinkStyle}
                  href={'https://datatables.net/manual/options'}
                  target={'_blank'}
                >
                  official Options guide,
                </Link>{' '}
                which will help you determine the settings for your desired
                table output. Note that different Plugins may add more options.
              </p>
            </div>
            <CodeTabs />
          </m.div>
        </m.div>
        {/* START: static table example */}
        <m.div
          className={clsx(PageMainStyle, 'pt-0!', 'pb-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'datatables-client-side'}
          >
            <div
              className={clsx(
                ContentMainStyle,
                'w-[calc(66.6667%-128px)]',
                'min-w-[calc(66.6667%-128px)]',
                'max-w-[calc(66.6667%-128px)]',
              )}
              ref={staticRef}
            >
              <div className={PageBreakStyle}></div>
              <h3 className={clsx('flex', 'items-center')}>
                <Link
                  href={'#datatables-client-side'}
                  className={clsx('inline', 'group')}
                >
                  Client-side Processing&nbsp;
                  <LinkIcon className={LinkIconStyle} />
                </Link>
              </h3>
              <p>
                With client-side processing, DataTables requests the data once
                from a remote API. After the data is downloaded, all searching,
                sorting, and pagination are performed in the user's browser.
                This approach is ideal when the dataset is relatively small
                (hundreds or a few thousand rows) and the API can return the
                entire dataset efficiently.
              </p>
              <p>
                Resource:{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'https://open.canada.ca/data/dataset/933c7f9d-deb0-4367-940d-06c38f494153/resource/04cbec5c-5a3d-4d34-927d-e41c9e6e3736'
                  }
                  target={'_blank'}
                >
                  Open Government Portal Department List - Government of Canada
                  Department List
                </Link>
              </p>
              {staticTableData.columns.length > 0 ? (
                <div
                  className={clsx(
                    'w-full',
                    'min-w-full',
                    'max-w-full',
                    'block',
                    'relative',
                  )}
                >
                  <DataTable
                    key={staticTableData.columns.map((_c) => _c.data).join('-')}
                    data={staticTableData.data}
                    columns={staticTableData.columns}
                    options={{
                      autoWidth: true,
                      searchHighlight: true,
                      responsive: false,
                      scrollX: true,
                      scrollY: '448px',
                      scrollCollapse: true,
                      search: { return: true },
                      paging: true,
                    }}
                    className={clsx(
                      'table',
                      'table-striped',
                      'table-hover',
                      'dark',
                      'w-full',
                    )}
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'min-h-112',
                    'flex',
                    'items-center',
                    'justify-center',
                  )}
                >
                  <Loader />
                </div>
              )}
            </div>
            <CodeTabs
              className={clsx('mt-24')}
              codeBlockStyle={{
                maxHeight: staticSecHeight ? `${staticSecHeight}px` : undefined,
              }}
              examples={static_table_examples}
              label={'Client Side DataTables w/ DataStore Search'}
            />
          </m.div>
        </m.div>
        {/* END: static table example */}
        {/* START: server side table example */}
        <m.div
          className={clsx(PageMainStyle, 'pt-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'datatables-server-side'}
          >
            <div
              className={clsx(
                ContentMainStyle,
                'w-[calc(66.6667%-128px)]',
                'min-w-[calc(66.6667%-128px)]',
                'max-w-[calc(66.6667%-128px)]',
              )}
              ref={serverRef}
            >
              <div className={PageBreakStyle}></div>
              <h3 className={clsx('flex', 'items-center')}>
                <Link
                  href={'#datatables-server-side'}
                  className={clsx('inline', 'group')}
                >
                  Server-side Processing&nbsp;
                  <LinkIcon className={LinkIconStyle} />
                </Link>
              </h3>
              <p>
                For very large datasets, DataTables can operate with server-side
                processing. Instead of downloading every record on page load,
                DataTables sends a request every time the user interacts with
                the table, such as paging, column ordering, or searching. This
                allows DataTables to efficiently work with datasets containing
                millions of records while transferring only a small amount of
                data for each interaction.
              </p>
              <h4>Known Limitations</h4>
              <p>
                Though the DataTables library is robust and offers a lot of
                functionality and plugins, not all of these are supported in the
                Open Data API. Here are some of the common limitations to the
                datastore_search API endpoint:
              </p>
              <ul className={clsx('list-disc')}>
                <li>Maximum records per page is 32,000</li>
                <li>
                  Full text search is disabled for data over 100,000 records (q
                  parameter in datastore_search, search parameter in DataTables)
                </li>
                <li>
                  Column filters are only exact match (filters parameter in
                  datastore_search, ColumnControl search in DataTables)
                </li>
                <li>
                  Does not support querying like "greater than" or "less than",
                  date ranges, or "starts with" or "ends with"
                </li>
                <li>
                  Does not support boolean querying like "does not contain"
                </li>
              </ul>
              <p>
                Resource:{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'https://open.canada.ca/data/en/dataset/d8f85d91-7dec-4fd1-8055-483b77225d8b/resource/fac950c0-00d5-4ec1-a4d3-9cbebf98a305'
                  }
                  target={'_blank'}
                >
                  Proactive Publication - Contracts - Contracts over $10,000
                </Link>
              </p>
              {serverTableColumns.length > 0 ? (
                <div
                  className={clsx(
                    'w-full',
                    'min-w-full',
                    'max-w-full',
                    'block',
                  )}
                >
                  <DataTable
                    key={serverTableColumns.map((_c) => _c.data).join('-')}
                    columns={serverTableColumns}
                    options={{
                      autoWidth: true,
                      searchHighlight: true,
                      responsive: false,
                      processing: true,
                      serverSide: true,
                      scrollX: true,
                      scrollY: '448px',
                      scrollCollapse: true,
                      searching: false,
                      paging: true,
                      columnControl: [
                        {
                          target: 'thead',
                          content: ['order'],
                        },
                        {
                          target: 'tfoot',
                          content: ['search'],
                        },
                      ],
                      ajax: (_data, _callback) => {
                        const limit = _data.length || 10;
                        const offset = _data.start || 0;
                        const search = encodeURIComponent(
                          _data?.search?.value ?? '',
                        );
                        const order = _data.order?.[0];
                        const sort =
                          order && serverTableColumns[order.column]
                            ? `${serverTableColumns[order.column].data} ${order.dir}`
                            : '';
                        const filters = {};
                        _data.columns?.forEach((_c) => {
                          if (_c.search.value) {
                            filters[_c.data] = _c.search.value;
                          }
                        });
                        const url = new URL(
                          `${API_BASE_URI}/data/api/action/datastore_search`,
                        );
                        url.searchParams.set(
                          'resource_id',
                          'fac950c0-00d5-4ec1-a4d3-9cbebf98a305',
                        );
                        url.searchParams.set('limit', limit);
                        url.searchParams.set('offset', offset);
                        if (sort) {
                          url.searchParams.set('sort', sort);
                        }
                        if (Object.keys(filters).length) {
                          url.searchParams.set(
                            'filters',
                            JSON.stringify(filters),
                          );
                        }
                        if (search) {
                          url.searchParams.set('q', search);
                        }
                        const fetchConfig = API_KEY
                          ? { headers: { Authorization: API_KEY } }
                          : {};
                        fetch(url, fetchConfig)
                          .then((r) => r.json())
                          .then((json) =>
                            _callback({
                              data: json.result.records,
                              recordsTotal: json.result.total,
                              recordsFiltered: json.result.total,
                            }),
                          );
                      },
                      initComplete(_settings) {
                        this.api()
                          .columns()
                          .every(function () {
                            const column = this;
                            waitForDataTablesInput(column, (input) => {
                              input.addEventListener('keyup', (event) => {
                                if (
                                  event.key === 'Enter' &&
                                  column.search() !== input.value
                                ) {
                                  column.search(input.value).draw();
                                }
                              });
                            });
                          });
                      },
                      drawCallback() {
                        document
                          .querySelectorAll(
                            '#datatables-server-side tbody mark.dt-highlight',
                          )
                          .forEach((mark) => {
                            mark.replaceWith(
                              document.createTextNode(mark.textContent),
                            );
                          });
                        this.api()
                          .columns()
                          .every(function () {
                            const search = this.search();
                            if (!search) {
                              return;
                            }
                            this.nodes().each((cell) => {
                              highlightCell(cell, search);
                            });
                          });
                      },
                    }}
                    className={clsx(
                      'table',
                      'table-striped',
                      'table-hover',
                      'dark',
                      'w-full',
                    )}
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'min-h-112',
                    'flex',
                    'items-center',
                    'justify-center',
                  )}
                >
                  <Loader />
                </div>
              )}
            </div>
            <CodeTabs
              className={clsx('mt-24')}
              codeBlockStyle={{
                maxHeight: serverSecHeight ? `${serverSecHeight}px` : undefined,
              }}
              examples={server_table_examples}
              label={'Server Side DataTables w/ DataStore Filters'}
            />
          </m.div>
        </m.div>
        {/* END: server side table example */}
        {/* START: data dictionary example */}
        <m.div
          className={clsx(PageMainStyle, 'pt-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'datatables-data-dictionary'}
          >
            <div
              className={clsx(
                ContentMainStyle,
                'w-[calc(66.6667%-128px)]',
                'min-w-[calc(66.6667%-128px)]',
                'max-w-[calc(66.6667%-128px)]',
              )}
              ref={dataDictRef}
            >
              <div className={PageBreakStyle}></div>
              <h3 className={clsx('flex', 'items-center')}>
                <Link
                  href={'#datatables-data-dictionary'}
                  className={clsx('inline', 'group')}
                >
                  Data Dictionary, Cell Types, & Cell Renderers&nbsp;
                  <LinkIcon className={LinkIconStyle} />
                </Link>
              </h3>
              <p>
                DataStore resources may include a Data Dictionary that describes
                the fields in a dataset, including each field's name, labels,
                and data type. If a Data Dictionary has been added to a
                resource, this metadata can be used to determine how each column
                should be handled when displaying the data in DataTables.
              </p>
              <p>
                By mapping the field types to DataTables column types, the table
                can apply appropriate sorting and searching behaviour. For
                example, treating integers and decimals as numeric values, dates
                as dates, and text fields as strings.
              </p>
              <p>
                The field metadata can also be used to determine cell renderers.
                For example, URL fields can be rendered as clickable links,
                boolean values can be displayed as readable labels or icons, and
                date fields can be formatted into a more user-friendly format.
              </p>
              <p>
                This allows a DataTables implementation to be dynamically
                generated from the DataStore schema, rather than requiring each
                dataset's columns and rendering rules to be manually configured.
              </p>
              <p>
                For all of the supported data types in DataTables, view{' '}
                <Link
                  className={PageLinkStyle}
                  href={'https://datatables.net/ref/core/option/columns.type'}
                  target={'_blank'}
                >
                  their official documentation.
                </Link>
              </p>
              <p>
                Resource:{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'https://open.canada.ca/data/dataset/2916fad5-ebcc-4c86-b0f3-4f619b29f412/resource/02a92b0f-b26d-4fbd-9601-d27651703715'
                  }
                  target={'_blank'}
                >
                  Open Government Analytics - Number of Visits, Downloads
                </Link>
              </p>
              {dataDictTableData.columns.length > 0 ? (
                <div
                  className={clsx(
                    'w-full',
                    'min-w-full',
                    'max-w-full',
                    'block',
                    'relative',
                  )}
                >
                  <DataTable
                    key={dataDictTableData.columns
                      .map((_c) => _c.data)
                      .join('-')}
                    data={dataDictTableData.data}
                    columns={dataDictTableData.columns}
                    options={{
                      autoWidth: true,
                      searchHighlight: true,
                      responsive: false,
                      scrollX: true,
                      scrollY: '448px',
                      scrollCollapse: true,
                      search: { return: true },
                      paging: true,
                      headerCallback: function (_thead) {
                        this.api()
                          .columns()
                          .every(function () {
                            const columnConfig =
                              dataDictTableData.columns[this.index()];
                            if (!columnConfig?.description) {
                              return;
                            }
                            const th = this.header();
                            const title = th.querySelector('.dt-column-title');
                            if (!title) {
                              return;
                            }
                            let iconContainer = title.querySelector(
                              '.column-description-icon',
                            );
                            if (!iconContainer) {
                              iconContainer = document.createElement('span');
                              iconContainer.className =
                                'column-description-icon inline ml-1';
                              iconContainer.setAttribute(
                                'aria-label',
                                columnConfig.description,
                              );
                              iconContainer.setAttribute(
                                'title',
                                columnConfig.description,
                              );
                              title.appendChild(iconContainer);
                            }
                            createRoot(iconContainer).render(
                              <QuestionIcon size={14} weight={'fill'} />,
                            );
                          });
                      },
                    }}
                    className={clsx(
                      'table',
                      'table-striped',
                      'table-hover',
                      'dark',
                      'w-full',
                    )}
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'min-h-112',
                    'flex',
                    'items-center',
                    'justify-center',
                  )}
                >
                  <Loader />
                </div>
              )}
            </div>
            <CodeTabs
              className={clsx('mt-24')}
              codeBlockStyle={{
                maxHeight: dataDictHeight ? `${dataDictHeight}px` : undefined,
              }}
              examples={data_dictionary_examples}
              label={'Client Side DataTables w/ Data Dictionary'}
            />
          </m.div>
        </m.div>
        {/* END: data dictionary example */}
        {/* START: group table example */}
        <m.div
          className={clsx(PageMainStyle, 'pt-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'datatables-grouping'}
          >
            <div
              className={clsx(
                ContentMainStyle,
                'w-[calc(66.6667%-128px)]',
                'min-w-[calc(66.6667%-128px)]',
                'max-w-[calc(66.6667%-128px)]',
              )}
              ref={groupRef}
            >
              <div className={PageBreakStyle}></div>
              <h3 className={clsx('flex', 'items-center')}>
                <Link
                  href={'#datatables-grouping'}
                  className={clsx('inline', 'group')}
                >
                  Row Grouping & Summary Statistics Row&nbsp;
                  <LinkIcon className={LinkIconStyle} />
                </Link>
              </h3>
              <p>
                The DataTables RowGroup extension adds the ability to organize
                table rows into groups based on the values of one or more
                columns. Instead of displaying a flat list of records, related
                rows can be visually grouped under a shared heading.
              </p>
              <p>
                For example, a dataset could be grouped by Province, with each
                province displayed as a separate section containing its
                corresponding records.
              </p>
              <p>
                RowGroup can also be used to add group headers and footers,
                allowing additional information such as group labels, counts, or
                summaries to be displayed.
              </p>
              <p>
                It is particularly useful for datasets where records naturally
                belong to categories or hierarchical groups, making large tables
                easier to scan and understand.
              </p>
              <p>
                Resource:{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'https://open.canada.ca/data/en/dataset/2916fad5-ebcc-4c86-b0f3-4f619b29f412/resource/15eeafa2-c331-44e7-b37f-d0d54a51d2eb'
                  }
                  target={'_blank'}
                >
                  Open Government Analytics - Open Maps Views
                </Link>
                <br />
                Filtered to show{' '}
                <em>"Environment and Climate Change Canada"</em> records,
                grouped by year. Has customized RowGroup renderers to render
                expand sections and summary rows for the groups.
              </p>
              {groupTableData.columns.length > 0 ? (
                <div
                  className={clsx(
                    'w-full',
                    'min-w-full',
                    'max-w-full',
                    'block',
                    'relative',
                  )}
                >
                  <DataTable
                    key={groupTableData.columns.map((_c) => _c.data).join('-')}
                    data={groupTableData.data}
                    columns={groupTableData.columns}
                    options={{
                      autoWidth: true,
                      searchHighlight: true,
                      responsive: false,
                      processing: true,
                      serverSide: false,
                      order: [[0, 'desc']],
                      pageLength: -1,
                      lengthChange: false,
                      scrollX: true,
                      scrollY: '448px',
                      scrollCollapse: true,
                      search: { return: true },
                      paging: false,
                      ordering: false,
                      rowGroup: {
                        dataSrc: ['year'],
                        startRender: function (rows, group) {
                          const expanded = expandedGroups.current.has(
                            Number(group),
                          );
                          const columnCount = rows.columns().count();

                          const tr = document.createElement('tr');
                          tr.className = 'group-header';
                          tr.dataset.group = group;

                          const td = document.createElement('td');
                          td.colSpan = columnCount;

                          const button = document.createElement('button');
                          button.type = 'button';
                          button.className = 'group-toggle';
                          button.setAttribute(
                            'aria-expanded',
                            String(expanded),
                          );
                          button.setAttribute(
                            'aria-label',
                            `${expanded ? 'Collapse' : 'Expand'} ${group} group`,
                          );

                          const icon = document.createElement('span');
                          icon.className = 'group-toggle-icon';
                          icon.setAttribute('aria-hidden', 'true');
                          icon.textContent = expanded ? '−' : '+';

                          const label = document.createElement('strong');
                          label.textContent = group;

                          button.append(icon, label);

                          button.addEventListener('click', () => {
                            console.log('GROUP CLICKED', group);
                            if (expandedGroups.current.has(group)) {
                              expandedGroups.current.delete(group);
                            } else {
                              expandedGroups.current.add(group);
                            }
                            rows.table().draw(false);
                          });

                          td.appendChild(button);
                          tr.appendChild(td);

                          return tr;
                        },
                        endRender: function (rows, group) {
                          const values = rows
                            .data()
                            .pluck('pageviews')
                            .toArray()
                            .map(Number)
                            .filter(Number.isFinite);
                          const total = values.reduce(
                            (sum, value) => sum + value,
                            0,
                          );
                          const average =
                            values.length > 0 ? total / values.length : 0;
                          const maximum =
                            values.length > 0 ? Math.max(...values) : 0;

                          const columnCount = rows.columns().count();

                          const tr = document.createElement('tr');
                          tr.className = 'group-summary';

                          const labelCell = document.createElement('td');
                          labelCell.colSpan = 2;

                          const label = document.createElement('strong');
                          label.textContent = `${group} Summary`;
                          labelCell.appendChild(label);

                          const summaryCell = document.createElement('td');
                          summaryCell.colSpan = Math.max(columnCount - 2, 1);
                          summaryCell.setAttribute(
                            'aria-label',
                            `${group} summary statistics`,
                          );

                          summaryCell.innerHTML = `
                            <span>Total: ${total.toLocaleString()}</span><br>
                            <span>Average: ${average.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span><br>
                            <span>Max: ${maximum.toLocaleString()}</span>
                          `;

                          tr.append(labelCell, summaryCell);

                          return tr;
                        },
                      },
                      rowCallback: function (row, data) {
                        const group = Number(data.year);
                        const expanded = expandedGroups.current.has(group);
                        row.hidden = !expanded;
                        row.setAttribute('aria-hidden', String(!expanded));
                      },
                      footerCallback: function () {
                        const api = this.api();
                        const values = api
                          .column('pageviews:name', { search: 'applied' })
                          .data()
                          .toArray()
                          .map(Number)
                          .filter(Number.isFinite);
                        const total = values.reduce(
                          (sum, value) => sum + value,
                          0,
                        );
                        const average = values.length
                          ? total / values.length
                          : 0;
                        const maximum = values.length ? Math.max(...values) : 0;

                        const footer = api.table().footer().querySelector('th');

                        footer.innerHTML = `
                          <span>Total: ${total.toLocaleString()}</span><br>
                          <span>Average: ${average.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span><br>
                          <span>Max: ${maximum.toLocaleString()}</span>
                        `;
                      },
                    }}
                    className={clsx(
                      'table',
                      'table-striped',
                      'table-hover',
                      'dark',
                      'w-full',
                    )}
                  >
                    <tfoot>
                      <tr>
                        <th colspan={groupTableData.columns.length || 1}></th>
                      </tr>
                    </tfoot>
                  </DataTable>
                </div>
              ) : (
                <div
                  className={clsx(
                    'min-h-112',
                    'flex',
                    'items-center',
                    'justify-center',
                  )}
                >
                  <Loader />
                </div>
              )}
            </div>
            <CodeTabs
              className={clsx('mt-24')}
              codeBlockStyle={{
                maxHeight: groupHeight ? `${groupHeight}px` : undefined,
              }}
              examples={group_table_examples}
              label={'Client Side DataTables w/ RowGroup & Custom Summaries'}
            />
          </m.div>
        </m.div>
        {/* END: group table example */}
      </AnimatePresence>
    </>
  );
}
