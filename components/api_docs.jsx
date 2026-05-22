'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';

export default function ApiDocs() {
  return (
    <ApiReferenceReact
      configuration={{
        url: '/basic.en.json',
      }}
    />
  )
}
