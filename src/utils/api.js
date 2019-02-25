import { stringify } from 'query-string';
import { domain } from '../config.json';

// TODO: check version '1.5.0';
const apiVersion = 1;

const headers = {
  'Content-Type': 'application/json',
  'X-IOTA-API-Version': apiVersion,
};

const parseSettings = ({ method, data } = {}) => ({
  headers,
  method,
  body: data ? JSON.stringify(data) : undefined,
});

const parseEndpoint = (endpoint, params) => {
  const querystring = params ? `?${stringify(params)}` : '';
  return `${endpoint}${querystring}`;
};

const request = async (endpoint, { params, ...settings } = {}) => {
  if (!endpoint) return null;
  const response = await fetch(parseEndpoint(endpoint, params), parseSettings(settings));
  const result = await response.json();
  return result;
};

export default {
  get: async (endpoint, params) => {
    return await request(`${domain}/${endpoint}`, { method: 'get', params });
  },
  post: async (endpoint, data = {}) => {
    return await request(`${domain}/${endpoint}`, { method: 'post', data });
  },
  put: async (endpoint, data = {}) => {
    return await request(`${domain}/${endpoint}`, { method: 'put', data });
  },
  delete: async (endpoint, data = {}) => {
    return await request(`${domain}/${endpoint}`, { method: 'delete', data });
  },
  requestBalance: async (endpoint, data = {}) => {
    return await request(endpoint, { method: 'post', data });
  }
};
