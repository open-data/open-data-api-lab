import clsx from 'clsx';

export const SideBarLinkStyle = clsx(
  'text-palette-grey!',
  'font-semibold',
  'border',
  'border-palette-lite-grey-accent',
  'hover:bg-palette-lite-grey-accent',
  'active:bg-palette-lite-grey-accent',
  'focus:bg-palette-lite-grey-accent',
  'px-3',
  'py-2',
  '-mx-2',
  'rounded-xl',
  'flex',
  'items-center',
);

export const PageMainStyle = clsx(
  'min-h-screen',
  'py-18',
  'ml-[calc(100%/6)]',
  'px-8',
  'flex',
  'gap-8',
);
