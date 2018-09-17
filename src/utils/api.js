import { domain } from '../config.json';

// TODO: check version '1.5.0';
const apiVersion = 1;

const headers = {
  'Content-Type': 'application/json',
  'X-IOTA-API-Version': apiVersion,
};

export const fetchData = async (endpoint, data = {}) => {
  if (!endpoint) return null;
  const response = await fetch(endpoint, {
    headers,
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export default async (endpoint, data = {}) => {
  return await fetchData(`${domain}/${endpoint}`, data);
};
