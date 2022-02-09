import { post } from '@shared/libs/http-helper';

const API_URL = '/authenticate/admin';

export const loginService = (username: string, password: string) => {
  return post(`${API_URL}`, {
    username,
    password,
  }).then((res) => {
    console.log(res);
    return res.data;
  });
};

export const logoutService = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('user');
};
