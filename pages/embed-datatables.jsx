import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import DataTablesDependencies from '@/dependencies/dataTables';
import { PageMainStyle } from '@/utils/classNames';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';
import { ckan_action_api } from '@/utils/functions';

export default function EmbedDataTablesPage(props) {
  const [data, setData] = useState();

  useEffect(() => {
    async function load() {
      try {
        const json = await ckan_action_api('datastore_search', {
          resource_id: '02a92b0f-b26d-4fbd-9601-d27651703715',
          limit: 10,
        });

        setData(json);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <>
      <DocHead
        title="Embed DataTables | Canadian Open Data API Lab"
        description="Use case examples for the Government of Canada Open Data Portal API"
      />
      <DataTablesDependencies />
      <AnimatePresence>
        <div className={PageMainStyle}>
          <m.div
            className={clsx('w-full', 'flex-col')}
            variants={animationWrapper}
            initial={'hidden'}
            animate={'show'}
          >
            <m.h1
              className={clsx('relative', 'inline-block', 'max-s992:text-5xl!')}
              variants={splashTextAnimation}
            >
              EMBED DATABLES
            </m.h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </m.div>
        </div>
      </AnimatePresence>
    </>
  );
}
