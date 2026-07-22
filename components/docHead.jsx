import Head from 'next/head';
import { useRouter } from 'next/router';

export default function DocHead(props) {
  const router = useRouter();
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="title" content={props.title} />
      <meta name="description" content={props.description} />

      <meta
        property="og:url"
        content={'http://localhost:3000/' + router.pathname}
      />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />

      <meta
        property="twitter:url"
        content={'http://localhost:3000/' + router.pathname}
      />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
    </Head>
  );
}
