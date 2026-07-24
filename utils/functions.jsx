import { API_BASE_URI, API_KEY } from '@/utils/constants';

export async function ckan_api(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization: API_KEY,
      ...init.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.warning(
      `Request failed (${response.status}): ${response.statusText}`,
    );
  }

  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    json: data,
  };
}

export async function ckan_action_api(action, params = {}) {
  const url = new URL(`/data/api/action/${action}`, API_BASE_URI);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return ckan_api(url);
}
