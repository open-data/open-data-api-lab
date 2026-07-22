import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import { PageMainStyle } from '@/utils/classNames';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';

export default function HomePage(props) {
  return (
    <>
      <DocHead
        title="Canadian Open Data API Lab"
        description="Use case examples for the Government of Canada Open Data Portal API"
      />
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
              Canadian Open Data API Lab
            </m.h1>
          </m.div>
        </div>
      </AnimatePresence>
    </>
  );
}
