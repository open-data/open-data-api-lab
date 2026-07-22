import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { TableIcon } from '@phosphor-icons/react';
import { SideBarLinkStyle } from '@/utils/classNames';
import { slideInLeftAnimation } from '@/utils/animations';

export default function SideBar(props) {
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
          'bg-palette-lite-grey',
        )}
        variants={slideInLeftAnimation}
        initial={'hidden'}
        animate={'show'}
      >
        <div className={clsx('bg-palette-dark-blue', 'px-5', 'py-4')}>
          <Link
            href={'/'}
            className={clsx(
              'text-palette-white!',
              'font-semibold',
              'flex',
              'justify-start',
              'items-center',
              props.pathname == '/'
                ? 'pointer-default! pointer-events-none!'
                : '',
            )}
            tabIndex={props.pathname == '/' ? '-1' : '0'}
          >
            <Image
              src={'/opendatacan_r.png'}
              width={65}
              height={65}
              alt={''}
              className={clsx('w-8', 'h-8')}
            />
            &nbsp;&nbsp;&nbsp;
            <span>Canadian Open Data API Lab</span>
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
            'border-r-2',
            'border-palette-lite-grey-accent',
          )}
        >
          <Link
            href={'/embed-datatables'}
            className={clsx(
              SideBarLinkStyle,
              props.pathname == '/embed-datatables'
                ? 'bg-palette-lite-grey-accent! pointer-default! pointer-events-none!'
                : '',
            )}
            tabIndex={props.pathname == '/embed-datatables' ? '-1' : '0'}
          >
            <TableIcon size={24} />
            &nbsp; Embed DataTables
          </Link>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
