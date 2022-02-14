import { get, put, getWithParams } from '@shared/libs/http-helper';

const API_URL = '/artists';

export interface ArtistFilterObject {
  Status: string | null;
  Gender: string | null;
}

export const getArtists = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  sort: any,
  filter: ArtistFilterObject,
  filterCountryList: string[],
  filterStyleList: string[]
) => {
  return get(
    `${API_URL}/search?pageNumber=${pageNumber}&pageSize=${pageSize}${
      searchString !== '' ? '&&searchString=' + searchString : ''
    }${sort && sort.Name != null ? '&sort[Name]=' + sort.Name : ''}${
      sort && sort.Email != null ? '&sort[Email]=' + sort.Email : ''
    }${sort && sort.Gender != null ? '&sort[Gender]=' + sort.Gender : ''}${
      sort && sort.Status != null ? '&sort[Email]=' + sort.Status : ''
    }${filter.Gender != null ? '&filter[Gender]=' + filter.Gender : ''}${
      filter.Status != null ? '&filter[Status]=' + filter.Status : ''
    }${
      filterCountryList.length > 0
        ? filterCountryList
            .map((country) => '&filter[Country]=' + country)
            .join('')
        : ''
    }${
      filterStyleList.length > 0
        ? filterStyleList.map((style) => '&filter[VoiceStyle]=' + style)
        : ''
    }`
  );
};

export const getArtistDetail = (id: string) => {
  return get(`${API_URL}/${id}`);
};

export const changeStatusOfArtist = (id: string, status: number) => {
  return put(`${API_URL}/${id}/status?status=${status}`, {});
};

export const getArtistRatings = (
  id: string,
  pageNumber: number,
  pageSize: number
) => {
  return getWithParams(`${API_URL}/${id}/rating`, {
    pageNumber,
    pageSize,
  });
};
