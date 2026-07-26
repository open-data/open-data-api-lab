'use client';

import clsx from 'clsx';
import DataTable from '@/components/dataTableClient';
import { useEffect, useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import Link from 'next/link';
import CodeTabs from '@/components/codeTabs';
import Loader from '@/components/loader';
import {
  PageMainStyle,
  ContainerMainStyle,
  ContentMainStyle,
  PageLinkStyle,
  PageBreakStyle,
} from '@/utils/classNames';
import { WarningIcon } from '@phosphor-icons/react';
import { API_BASE_URI } from '@/utils/constants';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';
import { ckan_action_api } from '@/utils/functions';
import { API_KEY } from '@/utils/constants';

export default function EmbedDataTablesPage(props) {
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
  fetch('${API_BASE_URI}/api/action/datastore_search?resource_id=fac950c0-00d5-4ec1-a4d3-9cbebf98a305&limit=0')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== "_id").map(_f => ({
        title: _f.id,
        data: _f.id,

      }));
      // disable ColumnControl search on keypress, see initComplete for Enter key binding
      DataTable.ColumnControl.SearchInput.prototype.runSearch = function(){ return; }
      const table = new DataTable('#example', {
        columns: columns,
        columnControl: [
          {
            "target": "thead",
            "content": ["order"]
          },
          {
            "target": "tfoot",
            "content": ["search"]
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
          const url = new URL(\`${API_BASE_URI}/api/action/datastore_search\`);
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

  const [staticTableData, setStaticTableData] = useState({
    data: [],
    columns: [],
  });
  useEffect(() => {
    async function load_static_data() {
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

    load_static_data();
  }, []);

  const [serverTableColumns, setServerTableColumns] = useState([]);
  useEffect(() => {
    async function load_server_data() {
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

    load_server_data();
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

  const staticRef = useRef(null);
  const [staticSecHeight, setStaticSecHeight] = useState(null);
  const serverRef = useRef(null);
  const [serverSecHeight, setServerSecHeight] = useState(null);

  useEffect(() => {
    const staticSec = staticRef.current;
    const serverSec = serverRef.current;

    const updateHeights = () => {
      setStaticSecHeight(
        staticSec ? `[${staticSec.getBoundingClientRect().height}px]` : 'auto',
      );
      setServerSecHeight(
        serverSec ? `[${serverSec.getBoundingClientRect().height}px]` : 'auto',
      );
    };

    const observer = new ResizeObserver(updateHeights);
    observer.observe(staticSec);
    observer.observe(serverSec);
    updateHeights();

    return () => {
      observer.disconnect();
    };
  }, []);

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
              <h3>Client-side Processing</h3>
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
              examples={static_table_examples}
              label={'Client Side DataTables w/ DataStore Search'}
            />
          </m.div>
        </m.div>
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
              <h3>Server-side Processing</h3>
              <p>
                For very large datasets, DataTables can operate with server-side
                processing. Instead of downloading every record on page load,
                DataTables sends a request every time the user interacts with
                the table, such as paging, column ordering, or searching. This
                allows DataTables to efficiently work with datasets containing
                millions of records while transferring only a small amount of
                data for each interaction.
              </p>
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
              codeClassName={clsx(`max-h-${serverSecHeight}`)}
              examples={server_table_examples}
              label={'Server Side DataTables w/ DataStore Filters'}
            />
          </m.div>
        </m.div>
      </AnimatePresence>
    </>
  );
}
