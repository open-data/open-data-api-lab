import '@/styles/globals.css';
import clsx from 'clsx';
import MenuBar from '@/components/menuBar';
import CodeBar from '@/components/codeBar';

export default function App({ Component, pageProps, router }) {
  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col')}>
      <MenuBar pathname={router.pathname} />
      <main className={clsx('flex-1')}>
        <Component key={router.pathname} {...pageProps} />
      </main>
      <CodeBar />
    </div>
  );
}
