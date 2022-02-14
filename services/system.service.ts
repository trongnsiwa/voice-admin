import {
  del,
  get,
  getWithParams,
  postWithParams,
  put,
} from '@shared/libs/http-helper';

const API_URL_GENDER = '/genders';
const API_URL_COUNTRY = '/countries';
const API_URL_STYLE = '/voice-styles';
const API_URL_PURPOSE = '/usage-purposes';

export const getAllGenders = () => {
  return get(API_URL_GENDER);
};

export const getGenders = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  isAsc: boolean
) => {
  return getWithParams(API_URL_GENDER, {
    pageNumber,
    pageSize,
    searchString,
    isAsc,
  });
};

export const createGender = (gender: string) => {
  return postWithParams(API_URL_GENDER, null, {
    gender,
  });
};

export const updateGender = (id: string, name: string) => {
  return put(API_URL_GENDER, {
    id,
    name,
  });
};

export const deleteGender = (id: string) => {
  return del(`${API_URL_GENDER}/${id}`);
};

export const getAllCountries = () => {
  return get(API_URL_COUNTRY);
};

export const getCountries = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  isAsc: boolean
) => {
  return getWithParams(API_URL_COUNTRY, {
    pageNumber,
    pageSize,
    searchString,
    isAsc,
  });
};

export const createCountry = (country: string) => {
  return postWithParams(API_URL_COUNTRY, null, {
    country,
  });
};

export const updateCountry = (id: string, name: string) => {
  return put(API_URL_COUNTRY, {
    id,
    name,
  });
};

export const deleteCountry = (id: string) => {
  return del(`${API_URL_COUNTRY}/${id}`);
};

export const getAllVoiceStyles = () => {
  return get(API_URL_STYLE);
};

export const getVoiceStyles = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  isAsc: boolean
) => {
  return getWithParams(API_URL_STYLE, {
    pageNumber,
    pageSize,
    searchString,
    isAsc,
  });
};

export const createStyle = (voiceStyle: string) => {
  return postWithParams(API_URL_STYLE, null, {
    voiceStyle,
  });
};

export const updateStyle = (id: string, name: string) => {
  return put(API_URL_STYLE, {
    id,
    name,
  });
};

export const deleteStyle = (id: string) => {
  return del(`${API_URL_STYLE}/${id}`);
};

export const getPurposes = (
  pageNumber: number,
  pageSize: number,
  searchString: string,
  isAsc: boolean
) => {
  return getWithParams(API_URL_PURPOSE, {
    pageNumber,
    pageSize,
    searchString,
    isAsc,
  });
};

export const createPurpose = (usagePurpose: string) => {
  return postWithParams(API_URL_PURPOSE, null, {
    usagePurpose,
  });
};

export const updatePurpose = (id: string, name: string) => {
  return put(API_URL_PURPOSE, {
    id,
    name,
  });
};

export const deletePurpose = (id: string) => {
  return del(`${API_URL_PURPOSE}/${id}`);
};
