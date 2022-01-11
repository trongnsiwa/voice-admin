import Header from '@components/common/header';
import { ERRORS } from '@constants/error-code';
import { loginAction } from '@redux/actions/auth-action';
import { hideLoader, showLoader } from '@redux/actions/loader-action';
import { clearMessage } from '@redux/actions/message-action';
import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Url } from 'url';
import { useBoolean } from 'usehooks-ts';
import * as Yup from 'yup';

const Login = () => {
  // states
  const { toggle, value } = useBoolean(false);

  // selectors
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { message } = useAppSelector((state) => state.mess);

  // dispatch
  const dispatch = useAppDispatch();

  // router
  const router = useRouter();

  // yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(ERRORS.ERR_REQUIRED).trim(),
    password: Yup.string().required(ERRORS.ERR_REQUIRED).trim(),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const username = values.username;
      const password = values.password;

      // dispatch(showLoader());

      // dispatch(loginAction(username, password))
      //   .then(() => {
      //     const { from } = router.query || {
      //       from: { pathname: '/' },
      //     };
      //     router.push(from as unknown as Url);
      //     history.go(0);
      //   })
      //   .catch((error) => {
      //     dispatch(hideLoader());
      //   });

      console.log(username, password);
    },
  });

  // effects
  useEffect(() => {
    if (formik.errors.username || formik.errors.password) {
      dispatch(clearMessage());
    }
  }, [dispatch, formik.errors.password, formik.errors.username]);

  if (isLoggedIn) {
    router.replace('/');
  }

  return (
    <div className="w-screen h-screen flex bg-secondary relative">
      <img
        src="/images/dashboard.png"
        alt=""
        className="hidden md:block absolute w-[30em] h-[30em] lg:w-[35em] lg:h-[35em] xl:w-[40em] xl:h-[40em] bottom-0 left-[15%] xl:left-1/3 xl:-translate-x-1/3"
      />
      <img
        src="/images/message.png"
        alt=""
        className="hidden md:block absolute w-[10em] top-[10%] left-[3%] rotate-[330deg]"
      />
      <img
        src="/images/warning.png"
        alt=""
        className="hidden md:block absolute w-[10em] top-[2%] left-1/2 -translate-x-[100%] scale-x-[-1] rotate-[270deg]"
      />
      <div className="bg-gradient-to-tr from-secondary-light to-secondary h-screen w-1/12 md:w-1/2">
        <h1 className="hidden md:block absolute top-[25%] left-[7%] font-extrabold text-5xl xl:text-6xl leading-tight">
          &quot;Tieng noi
          <br /> Thuong Hieu&quot;
        </h1>
      </div>
      <div className="h-full bg-white shadow-2xl w-11/12 md:w-1/2 rounded-l-[5em]">
        <div className="mx-auto max-w-md mt-24">
          <div className="flex justify-center flex-col">
            <img
              className="my-2 mx-auto w-[7em]"
              src={'/images/logo.png'}
              alt=""
            />
            <span className="text-xl text-center mt-2 font-bold">
              Voice Platform Management
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8">
            <p className="font-bold text-lg mb-5">Đăng nhập</p>
            {message && <p className="error-message mb-2">{message}</p>}

            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Tên tài khoản</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`input input-bordered input-ghost focus:border-primary hover:border-primary ${
                  formik.touched.username &&
                  formik.errors.username &&
                  'border-error focus:border-error hover:border-error'
                }`}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-error text-sm mt-2">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="form-control mt-3 relative">
              <label htmlFor="password" className="label">
                <span className="label-text">Mật khẩu</span>
              </label>
              <input
                type={value ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`input input-bordered input-ghost focus:border-primary hover:border-primary ${
                  formik.touched.password &&
                  formik.errors.password &&
                  'border-error focus:border-error hover:border-error'
                }`}
              />
              <a
                className={`absolute right-3 ${
                  formik.touched.password && formik.errors.password
                    ? 'top-[40%]'
                    : 'top-[55%]'
                } cursor-pointer`}
                onClick={toggle}
              >
                Hiện
              </a>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-error text-sm mt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <a className="flex justify-end text-sm mt-2 link link-primary">
              Quên mật khẩu?
            </a>

            <button
              type="submit"
              className="w-full mt-14 btn btn-outline btn-primary"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
