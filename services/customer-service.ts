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
  sort: any | null,
  filter: CustomerFilterObject
) => {
  return get(
    `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}${
      searchString !== '' ? '&searchString=' + searchString : ''
    }${sort && sort.Name != null ? '&sort[Name]=' + sort.Name : ''}${
      sort && sort.Email != null ? '&sort[Email]=' + sort.Email : ''
    }${sort && sort.Gender != null ? '&sort[Gender]=' + sort.Gender : ''}${
      sort && sort.Status != null ? '&sort[Email]=' + sort.Status : ''
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
