import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <Head>
        <meta name="theme-color" content="#38414d" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opendatacan_c.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/opendatacan_c.png" />

        <link rel="icon" href="/opendatacan_r.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/opendatacan_r.png"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
