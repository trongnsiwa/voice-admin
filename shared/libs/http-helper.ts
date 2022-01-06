import axios from 'axios';
import authHeader from '@services/auth-header';

const endpoint = 'https://api.voiceplatform.social/api/v1';

export const get = (url: string) => {
  return axios.get(endpoint + url, {
    headers: authHeader(),
  });
};

export const getWithParams = (url: string, params: any) => {
  return axios.get(endpoint + url, {
    headers: authHeader(),
    params: params,
  });
};

export const post = (url: string, body: any) => {
  return axios.post(endpoint + url, body, {
    headers: authHeader(),
  });
};

export const postWithParams = (url: string, body: any, params?: any) => {
  return axios.post(endpoint + url, body, {
    headers: authHeader(),
    params: params,
  });
};

export const put = (url: string, body: any) => {
  return axios.put(endpoint + url, body, {
    headers: authHeader(),
  });
};

export const patch = (url: string, body: any) => {
  return axios.patch(endpoint + url, body, {
    headers: authHeader(),
  });
};

export const del = (url: string) => {
  return axios.delete(endpoint + url, {
    headers: authHeader(),
  });
};
