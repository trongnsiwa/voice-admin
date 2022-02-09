import { get, getWithParams, put } from '@shared/libs/http-helper';
const API_URL = '/projects';

export const getProjects = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  sort: any,
  createdStartDate: string | null,
  createdEndDate: string | null,
  filterStatusList: string[],
  filterAgeList: string[]
) => {
  return get(
    `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}${
      searchString !== '' ? '&&searchString=' + searchString : ''
    }${sort && sort.Name != null ? '&sort[Name]=' + sort.Name : ''}${
      sort && sort.Poster != null ? '&sort[Poster]=' + sort.Poster : ''
    }${sort && sort.Price != null ? '&sort[Price]=' + sort.Price : ''}${
      sort && sort.CreateDate != null
        ? '&sort[CreateDate]=' + sort.CreateDate
        : ''
    }${sort && sort.Status != null ? '&sort[Email]=' + sort.Status : ''}${
      filterStatusList.length > 0
        ? filterStatusList.map((status) => '&filter[Status]=' + status).join('')
        : ''
    }${
      filterAgeList.length > 0
        ? filterAgeList.map((age) => '&filter[Age]=' + age).join('')
        : ''
    }`
  );
};

export const getProjectsWaiting = (pageNumber: number, pageSize: number) => {
  return getWithParams(`${API_URL}/waiting`, {
    pageNumber,
    pageSize,
  });
};

export const getProjectDetail = (id: string) => {
  return get(`${API_URL}/${id}`);
};

export const getUserProjects = (
  pageNumber: number,
  pageSize: number,
  filter: string | null,
  id: string,
  isCustomer: boolean
) => {
  return getWithParams(`${API_URL}/user/${id}`, {
    pageNumber,
    pageSize,
    filter,
    isCustomer,
  });
};

export const getArtistsInProject = (
  pageNumber: number,
  pageSize: number,
  id: string,
  status: string | null
) => {
  return getWithParams(`${API_URL}/${id}/artists`, {
    pageNumber,
    pageSize,
    status,
  });
};

export const getProjectsOfArtist = (
  pageNumber: number,
  pageSize: number,
  id: string,
  status: string | null
) => {
  return getWithParams(`${API_URL}/artists/${id}`, {
    pageNumber,
    pageSize,
    status,
  });
};

export const checkEditedProject = (id: string, isAccept: boolean) => {
  return put(`${API_URL}/${id}/check?isAccept=${isAccept}`, {});
};
