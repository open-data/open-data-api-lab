import clsx from 'clsx';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import {
  PageMainStyle,
  ContainerMainStyle,
  ContentMainStyle,
} from '@/utils/classNames';
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
            PageMainStyle,
            'min-h-[65vh]',
            'justify-center',
            'flex-col',
            'items-start',
          )}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div className={ContainerMainStyle} variants={splashTextAnimation}>
            <div
              className={clsx(
                ContentMainStyle,
                'flex',
                'flex-col',
                'text-left',
                'items-start',
              )}
            >
              <h1
                className={clsx(
                  'relative',
                  'inline-block',
                  'text-center',
                  'max-w-2/3',
                  'pb-4',
                  'text-2xl!',
                  'font-bold!',
                  'border-b-2!',
                )}
              >
                {statusCode == 404
                  ? 'We could not find that webpage'
                  : 'An unknown error occured'}
              </h1>
              <h2
                className={clsx(
                  'relative',
                  'inline-block',
                  'text-center',
                  'text-3xl!',
                  'pb-4',
                  'text-palette-orange!',
                )}
              >
                Err. {statusCode}
              </h2>
            </div>
          </m.div>
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
