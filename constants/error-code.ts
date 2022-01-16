type ErrorsMapType = Record<string, string>;

export const ERRORS: ErrorsMapType = {
  ERR_LOGIN_FAIL: 'Incorrect username or password',
  ERR_REQUIRED: 'This field is required',
  ERR_DUPLICATED: 'This field is duplicated',
  ERR_EDIT_FAIL: 'Fail to edit',
  ERR_CREATE_FAIL: 'Fail to create',
  ERR_DELETE_FAIL: 'Fail to delete',
  ERR_RESOURCE_NOT_FOUND: 'No resouce found',
};
