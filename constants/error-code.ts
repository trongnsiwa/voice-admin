type ErrorsMapType = Record<string, string>;

export const ERRORS: ErrorsMapType = {
  ERR_LOGIN_FAIL: 'Tên đăng nhập hoặc mật khẩu không chính xác',
  ERR_REQUIRED: 'Trường này là bắt buộc',
  ERR_DUPLICATED: 'Đối tượng này đã được sử dụng',
  ERR_EDIT_FAIL: 'Chỉnh sửa thất bại',
  ERR_CREATE_FAIL: 'Tạo mới thất bại',
  ERR_DELETE_FAIL: 'Xóa thất bại',
  ERR_RESOURCE_NOT_FOUND: 'Không tìm thấy tài nguyên',
};
