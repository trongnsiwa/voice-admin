import axios, { AxiosError, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'https://api.voiceplatform.social/api/v1',
});

const request = ({ ...options }) => {
  const user = JSON.parse(localStorage.getItem('user') as any);

  client.defaults.headers.common.Authorization = 'Bearer ' + user.token;
  client.defaults.headers.post['Content-Type'] =
    'application/json;charset=UTF-8';

  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};

export const get = (url: string) => {
  return request({ url, method: 'get' });
};

export const getWithParams = (url: string, params: any) => {
  return request({ url, method: 'get', params });
};

export const post = (url: string, data: any) => {
  return request({ url, method: 'post', data });
};

export const postWithParams = (url: string, data: any, params?: any) => {
  return request({ url, method: 'post', params, data });
};

export const put = (url: string, data: any) => {
  return request({ url, method: 'put', data });
};

export const patch = (url: string, data: any) => {
  return request({ url, method: 'patch', data });
};

export const del = (url: string) => {
  return request({ url, method: 'delete' });
};
