import clsx from 'clsx';

export default function Loader(props) {
  return (
    <div
      className={clsx(
        'w-60',
        'h-8',
        'rounded-full',
        'bg-[linear-gradient(90deg,#0001_33%,#0005_50%,#0001_66%)]',
        'bg-[rgba(255,255,255,0.07)]',
        'bg-size-[300%_100%]',
        'animate-loader',
      )}
    ></div>
  );
}
