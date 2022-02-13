import { get, getWithParams, put } from '@shared/libs/http-helper';
const API_URL = '/projects';

export interface ProjectFilterObject {
  Status: string | null;
  PriceMin: string | null;
  PriceMax: string | null;
  CreateDate: string | null;
}

export const getProjects = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  sort: any,
  filter: ProjectFilterObject
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
      filter.PriceMin != null && filter.PriceMin !== ''
        ? '&filter[PriceMin]=' + filter.PriceMin
        : ''
    }${
      filter.Status != null && filter.Status !== ''
        ? '&filter[Status]=' + filter.Status
        : ''
    }${
      filter.PriceMax != null && filter.PriceMax !== ''
        ? '&filter[PriceMax]=' + filter.PriceMax
        : ''
    }${
      filter.CreateDate != null && filter.CreateDate !== ''
        ? '&filter[CreateDate]=' + filter.CreateDate
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
