import { API_BASE_URI } from '@/utils/constants';

export async function ckan_api(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ0WEZZQTRNWkhfcVFqWThOa3FRbVpmTXFsTzZHV0xCdnVvbE90bzYxcTlBIiwiaWF0IjoxNzE5NTE2MDM3fQ.9gX6_MI_gMRhV9MKnPPa1kHuCU5cQC_ra-bBoGfkdqA',
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed (${response.status}): ${response.statusText}`,
    );
  }

  return response.json();
}

export async function ckan_action_api(action, params = {}) {
  const url = new URL(`/data/api/action/${action}`, API_BASE_URI);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return ckan_api(url);
}
