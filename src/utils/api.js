import { api, domainName } from '../config.json';

// TODO: check version '1.5.0';
const apiVersion = 1;

const headers = {
  'Content-Type': 'application/json',
  'X-IOTA-API-Version': apiVersion,
};

export default async (endpoint, data = {}) => {
  if (!endpoint) return null;
  const response = await fetch(`https://${api}.${domainName}/${endpoint}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
