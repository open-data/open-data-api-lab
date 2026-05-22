import ApiDocs from '@/components/api_docs';
import '@scalar/api-reference-react/style.css';
import '@/styles/globals.css';

export default function RootLayout() {
  return (
    <html lang="en">
      <body><ApiDocs /></body>
    </html>
  )
}