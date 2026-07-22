import '@/styles/globals.css';
import clsx from 'clsx';
import SideBar from '@/components/sideBar';

export default function App({ Component, pageProps, router }) {
  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col')}>
      <SideBar pathname={router.pathname} />
      <main className={clsx('flex-1')}>
        <Component key={router.pathname} {...pageProps} />
      </main>
    </div>
  );
}
