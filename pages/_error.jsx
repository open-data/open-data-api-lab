import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';

function Error({ statusCode }) {
  return (
    <>
      <DocHead
        title="Error | Canadian Open Data API Lab"
        description="The website encountered an error"
      />
      <AnimatePresence>
        <m.div
          className={clsx(
            'min-h-[65vh]',
            'justify-center',
            'px-4',
            'pb-18',
            'max-w-328',
            'mx-auto',
            'flex',
            'flex-col',
            'items-center',
          )}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.h1
            className={clsx(
              'relative',
              'inline-block',
              'text-center',
              'max-w-2/3',
              'pb-4',
              'text-2xl!',
              'font-bold!',
            )}
            variants={splashTextAnimation}
          >
            {statusCode == 404
              ? 'We could not find that webpage'
              : 'An unknown error occured'}
          </m.h1>
          <m.h2
            className={clsx(
              'relative',
              'inline-block',
              'text-center',
              'text-3xl!',
              'pb-4',
              'text-palette-orange!',
            )}
            variants={splashTextAnimation}
          >
            Err. {statusCode}
          </m.h2>
        </m.div>
      </AnimatePresence>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
