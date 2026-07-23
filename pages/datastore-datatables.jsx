import clsx from 'clsx';
import DataTable from '@/components/dataTableClient';
import { useEffect, useState } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import Link from 'next/link';
import CodeTabs from '@/components/codeTabs';
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

export default function EmbedDataTablesPage(props) {
  const static_table_examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
<table id="example" class="display table table-striped" style="width:100%">
  <thead>
    <tr id="header-row"></tr>
  </thead>
</table>

<script>
  fetch('${API_BASE_URI}/data/api/action/datastore_search?resource_id=04cbec5c-5a3d-4d34-927d-e41c9e6e3736&limit=32000')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== '_id').map(_f => ({
        title: _f.id,
        data: _f.id
      }));
      const headerRow = document.getElementById('header-row');
      columns.forEach(_c => {
        const th = document.createElement('th');
        th.textContent = _c.id;
        headerRow.appendChild(th);
      });
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
    async function load_static_data() {
      try {
        const json = await ckan_action_api('datastore_search', {
          resource_id: '04cbec5c-5a3d-4d34-927d-e41c9e6e3736',
          limit: 32000,
        });

        setStaticTableData({
          data: json.result.records,
          columns: json.result.fields
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
                  Department List{' '}
                </Link>
              </p>
              {staticTableData && (
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
                    key={staticTableData.columns.map((c) => c.data).join('-')}
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
            id={'datatables-client-side'}
          >
            <div className={ContentMainStyle}>
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
            </div>
            <CodeTabs />
          </m.div>
        </m.div>
      </AnimatePresence>
    </>
  );
}
