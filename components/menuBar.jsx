import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { TableIcon } from '@phosphor-icons/react';
import { MenuBarLinkStyle } from '@/utils/classNames';
import { slideInLeftAnimation } from '@/utils/animations';

export default function MenuBar(props) {
  return (
    <AnimatePresence>
      <m.div
        className={clsx(
          'fixed',
          'left-0',
          'top-0',
          'right-0',
          'bottom-0',
          'w-2/12',
          'bg-ui-dark-bg',
          'border-r-2',
          'border-ui-dark-border-color',
        )}
        variants={slideInLeftAnimation}
        initial={'hidden'}
        animate={'show'}
      >
        <div className={clsx('bg-ui-dark-bg', 'px-5', 'py-4')}>
          <Link
            href={'/'}
            className={clsx(
              'group',
              'text-ui-white!',
              'font-semibold',
              'flex',
              'transition-all',
              'duration-300',
              'justify-start',
              'items-center',
              props.pathname == '/'
                ? 'pointer-default! pointer-events-none!'
                : '',
            )}
            tabIndex={props.pathname == '/' ? '-1' : '0'}
          >
            <Image
              src={'/opendatacan_t.png'}
              width={75}
              height={75}
              alt={''}
              className={clsx('w-10', 'h-10')}
            />
            &nbsp;&nbsp;&nbsp;
            <span
              className={clsx(
                'transition-all',
                'duration-300',
                'group-hover:scale-103',
                'group-focus:scale-103',
                'group-active:scale-103',
              )}
            >
              Canadian Open Data API Lab
            </span>
          </Link>
        </div>
        <div
          className={clsx(
            'flex',
            'flex-col',
            'w-full',
            'px-4',
            'py-2',
            'h-full',
          )}
        >
          <Link
            href={'/datastore-datatables'}
            className={clsx(
              MenuBarLinkStyle,
              props.pathname == '/datastore-datatables'
                ? 'bg-ui-btn-bg-active! pointer-default! pointer-events-none!'
                : '',
            )}
            tabIndex={props.pathname == '/datastore-datatables' ? '-1' : '0'}
          >
            <TableIcon size={24} />
            &nbsp; DataStore DataTables
          </Link>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
