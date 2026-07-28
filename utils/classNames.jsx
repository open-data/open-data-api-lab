import clsx from 'clsx';

export const MenuBarLinkStyle = clsx(
  'text-ui-white!',
  'font-semibold',
  'border',
  'border-ui-dark-border-color',
  'hover:bg-ui-btn-bg-focus',
  'active:bg-ui-btn-bg-focus',
  'focus:bg-ui-btn-bg-focus',
  'px-3',
  'py-2',
  '-mx-2',
  'rounded-xl',
  'flex',
  'items-center',
);

export const PageLinkStyle = clsx(
  'relative',
  'transition-all',
  'duration-300',
  'underline!',
  'underline-offset-4',
  'focus:outline-none',
  'focus:shadow-none',
  'focus:border-none',
  'focus:underline-offset-2',
  'active:underline-offset-2',
  'hover:underline-offset-2',
);

export const PageMainStyle = clsx(
  'py-18',
  'w-10/12',
  'ml-[calc(100%/6)]',
  'px-8',
  'flex',
  'gap-8',
  'overflow-hidden',
);

export const ContainerMainStyle = clsx(
  'w-full',
  'flex',
  'items-start',
  'gap-16',
);

export const ContentMainStyle = clsx('w-8/12');

export const PageBreakStyle = clsx(
  'w-full',
  'mx-auto',
  'h-[2px]',
  'rounded-full',
  'my-8!',
  'bg-[rgba(0,0,0,0.125)]',
);

export const CodeTabStyle = clsx(
  'flex',
  'flex-col',
  'relative',
  'w-[calc(41.666667%-64px)]!',
  'max-w-[calc(41.666667%-64px)]!',
  'min-w-[calc(41.666667%-64px)]!',
);

export const CodeTabContainerStyle = clsx(
  'overflow-hidden',
  'max-w-full!',
  'w-full',
  'rounded-lg',
  'border',
  'border-ui-dark-border-color',
);

export const CodeTabButtonStyle = clsx(
  'text-ui-white!',
  'px-4',
  'py-2',
  'flex',
  'items-center',
  'text-sm',
  'hover:bg-ui-btn-bg-focus',
  'active:bg-ui-btn-bg-focus',
  'focus:bg-ui-btn-bg-focus',
);

export const LinkIconStyle = clsx(
  'inline',
  'scale-x-[-1]',
  'transition-all',
  'duration-300',
  'opacity-0',
  'group-hover:opacity-100',
  'group-active:opacity-100',
  'group-focuse:opacity-100',
);
