import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import Link from 'next/link';
import CodeTabs from '@/components/codeTabs';
import Loader from '@/components/loader';
import { LinkIcon, WarningIcon } from '@phosphor-icons/react';
import {
  PageMainStyle,
  ContainerMainStyle,
  ContentMainStyle,
  PageLinkStyle,
  PageBreakStyle,
  LinkIconStyle,
} from '@/utils/classNames';
import { API_BASE_URI } from '@/utils/constants';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';
import { ckan_action_api } from '@/utils/functions';

export default function EmbedWETTablesPage(props) {
  // START: static table example
  const static_table_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<table id="example" class="wb-tables display table table-striped" style="width:100%"></table>

<script>
  fetch('${API_BASE_URI}/data/api/action/datastore_search?resource_id=04cbec5c-5a3d-4d34-927d-e41c9e6e3736&limit=32000')
    .then(r => r.json())
    .then(data => {
      const table = document.querySelector('#example');
      const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
      data.result.fields.filter(_f => _f.id !== '_id')?.forEach((_f) => {
        const header = document.createElement('th');
        header.innerText = _f.id;
        headerRow.appendChild(header);
      });
      thead.appendChild(headerRow);
          table.appendChild(thead);
      const tbody = document.createElement('tbody');
      data.result?.records.forEach((_r) => {
        const trow = document.createElement('tr');
        for( const[_id, _val] of Object.entries(_r) ){
          if( _id !== '_id' ){
            const cell = document.createElement('td');
            cell.setAttribute('data-datastore-id', _id);
            cell.innerText = _val;
            trow.append(cell);
          }
        }
        tbody.append(trow);
      });
      table.appendChild(tbody);
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

  const staticTableRef = useRef(null);
  const [staticTableVersion, setStaticTableVersion] = useState(0);
  useEffect(() => {
    // TODO: fix repainting...
    const table = staticTableRef.current;
    if (!table) return;

    const $table = $(table);

    requestAnimationFrame(() => {
      if (table.isConnected) {
        $table.trigger('wb-init.wb-tables');
      }
    });

    return () => {
      setStaticTableVersion((v) => v + 1);
      if ($.fn.DataTable.isDataTable(table)) {
        $table.DataTable().destroy();
      }
    };
  }, [staticTableData]);

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

  return (
    <>
      <DocHead
        title="WET Tables | Canadian Open Data API Lab"
        description="Use case examples for the Government of Canada Open Data Portal API"
      >
        <link
          rel="stylesheet"
          href="https://www.canada.ca/etc/designs/canada/wet-boew/css/theme.css"
        ></link>
        <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
      </DocHead>
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
            id={'wet-tables-overview'}
          >
            <div className={ContentMainStyle}>
              <h1>WET Tables</h1>
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
                  <strong>Disclaimer:</strong> wet-boew tables uses DataTables
                  1.10 ‒ a very outdated version of the DataTables framework
                </span>
              </div>
              <h2>Overview</h2>
              <p>
                The{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'https://wet-boew.github.io/v4.0-ci/docs/ref/tables/tables-en.html'
                  }
                  target={'_blank'}
                >
                  WET-BOEW Tables plugin
                </Link>{' '}
                integrates the DataTables JavaScript library into the Web
                Experience Toolkit (WET), providing an accessible and Government
                of Canada styled interface for working with large HTML tables.
                It adds features such as searching, sorting, filtering,
                pagination, and other table enhancements while integrating them
                with WET's styling, accessibility, and progressive-enhancement
                approach.
              </p>
              <p>
                WET-BOEW's Tables plugin is built around DataTables 1.10, a
                jQuery-based table library that provides the underlying table
                functionality. DataTables 1.10 introduced a substantially
                improved API and configuration system, allowing developers to
                control features such as ordering, searching, pagination, AJAX
                data sources, and column behaviour.
              </p>
              <p>
                WET provides the integration layer around DataTables. A table
                can be enhanced simply by adding the wb-tables class, with
                DataTables configuration supplied through the data-wb-tables
                attribute.
              </p>
              <p>
                This makes WET-BOEW Tables particularly useful when building
                Canada.ca-compatible interfaces, while still exposing much of
                the underlying DataTables functionality for more advanced
                implementations.
              </p>
            </div>
            <CodeTabs />
          </m.div>
        </m.div>
        {/* START: static table example */}
        <m.div
          className={clsx(PageMainStyle, 'pt-0!')}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'wet-tables-client-side'}
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
                  href={'#wet-tables-client-side'}
                  className={clsx('inline', 'group', 'text-ui-white!')}
                >
                  Client-side Processing&nbsp;
                  <LinkIcon className={LinkIconStyle} />
                </Link>
              </h3>
              <p>
                With client-side processing, you request the data once from a
                remote API and build the HTML table for the WET framework to
                use. After the data is downloaded, all searching, sorting, and
                pagination are performed in the user's browser. This approach is
                ideal when the dataset is relatively small (hundreds or a few
                thousand rows) and the API can return the entire dataset
                efficiently.
              </p>
              <p>
                This example can be repurposed into a static HTML table if you
                exclude the class wb-tables from your table element.
              </p>
              <p>
                Resource:{' '}
                <Link
                  className={PageLinkStyle}
                  href={
                    'hhttps://open.canada.ca/data/dataset/57180b36-3428-4a7f-afe3-2161a6b44ec5/resource/3faaafb4-00e2-4303-947d-ac786b62559f'
                  }
                  target={'_blank'}
                >
                  Data Reference Standard on Government of Canada Organization
                  Names and Codes - Concordance Data
                </Link>
              </p>
              {staticTableData.columns.length > 0 ? (
                <div
                  className={clsx(
                    'w-full',
                    'min-w-full',
                    'max-w-full',
                    'max-h-152',
                    'block',
                    'relative',
                    'overflow-scroll!',
                  )}
                  data-bs-theme={'light'}
                >
                  <table
                    id={'wet-tables-client-side-table'}
                    ref={staticTableRef}
                    key={staticTableVersion}
                    className={clsx(
                      'wb-tables',
                      'display',
                      'table',
                      'table-striped',
                      'w-full',
                    )}
                  >
                    <thead>
                      <tr>
                        {staticTableData.columns.map((_f) => (
                          <th key={_f.data} data-datastore-id={_f.data}>
                            {_f.data}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {staticTableData.data.map((_record, _index) => (
                        <tr key={_index}>
                          {staticTableData.columns.map((_col) => (
                            <td key={`${_index}-${_col.data}`}>
                              {_record[_col.data]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              label={'Client Side WET Table w/ DataStore Search'}
            />
          </m.div>
        </m.div>
        {/* END: static table example */}
      </AnimatePresence>
      <script src="https://www.canada.ca/etc/designs/canada/wet-boew/js/wet-boew.js"></script>
    </>
  );
}
