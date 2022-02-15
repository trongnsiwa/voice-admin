import { get, put } from '@shared/libs/http-helper';

const API_URL = '/customers';

export interface CustomerFilterObject {
  Status: string | null;
  Gender: string | null;
}

export const getCustomers = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  filter: CustomerFilterObject
) => {
  return get(
    `${API_URL}/search?pageNumber=${pageNumber}&pageSize=${pageSize}${
      searchString !== '' ? '&searchString=' + searchString : ''
    }${filter.Gender != null ? '&filter[Gender]=' + filter.Gender : ''}${
      filter.Status != null ? '&filter[Status]=' + filter.Status : ''
    }`
  );
};

export const getCustomerDetail = (id: string) => {
  return get(`${API_URL}/${id}`);
};

export const changeStatusOfCustomer = (id: string, status: number) => {
  return put(`${API_URL}/${id}/status?status=${status}`, {});
};
