import { AxiosRequestHeaders } from 'axios';

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user') as any);

  if (user && user.token) {
    return <AxiosRequestHeaders>{
      Authorization: 'Bearer ' + user.token,
      'Content-Type': 'application/json;charset=UTF-8',
    };
  } else {
    return {};
  }
}
