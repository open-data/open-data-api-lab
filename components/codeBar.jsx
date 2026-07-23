import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import { slideInRightAnimation } from '@/utils/animations';

export default function CodeBar(props) {
  return (
    <AnimatePresence>
      <m.div
        className={clsx(
          'fixed',
          'z-[-1]',
          'pointer-events-none!',
          'left-initial',
          'top-0',
          'right-0',
          'bottom-0',
          'w-4/12',
          'bg-ui-dark-bg',
          'border-l-2',
          'border-ui-dark-border-color',
        )}
        variants={slideInRightAnimation}
        initial={'hidden'}
        animate={'show'}
      ></m.div>
    </AnimatePresence>
  );
}
