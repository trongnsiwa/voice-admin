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
    <div className="w-screen h-screen flex bg-gradient-to-t from-secondary via-white  to-secondary relative">
      <img
        src="/images/wavy.png"
        alt=""
        className="hidden md:block absolute w-full h-full bottom-0 scale-x-[-1] overflow-hidden object-cover -left-[30%] lg:left-0 object-right"
      />
      <div
        className="bg-gradient-to-b from-secondary via-white to-secondary
       h-screen w-1/12 md:w-1/2"
      >
        <h1 className="hidden md:block absolute top-[20%] left-[7%] font-extrabold text-3xl lg:text-5xl xl:text-6xl leading-tight text-gray-700">
          &quot;Vocal
          <br /> To The Moon&quot;
        </h1>
        <img
          src="/images/login-1.jpg"
          alt=""
          className="hidden lg:block absolute w-[12em] bottom-[38%] left-[15%] rounded-2xl shadow-primary shadow-xl rotate-12"
        />
        <img
          src="/images/login-2.jpg"
          alt=""
          className="hidden lg:block absolute w-[12em] bottom-[20%] left-8 rounded-2xl shadow-primary shadow-xl rotate-[350deg]"
        />
        <img
          src="/images/dashboard.png"
          alt=""
          className="hidden md:block absolute w-[20em] h-[20em] lg:w-[35em] lg:h-[35em] xl:w-[40em] xl:h-[40em] bottom-0 left-[5%] xl:left-1/3 xl:-translate-x-1/3 z-[2]"
        />
        <img
          src="/images/message.png"
          alt=""
          className="hidden md:block absolute w-[6em] lg:w-[7em] xl:w-[10em] top-[9%] xl:top-[5%] left-[3%] rotate-[330deg]"
        />
        <img
          src="/images/warning.png"
          alt=""
          className="hidden lg:block absolute w-[7em] xl:w-[10em] top-[2%] left-1/2 -translate-x-[100%] scale-x-[-1] rotate-[270deg] z-[2]"
        />
        <img
          src="/images/music.png"
          alt=""
          className="hidden lg:block absolute w-[5em] top-[15%] left-1/3 xl:left-1/4 rotate-[30deg]"
        />
      </div>
      <div className="h-full bg-white shadow-2xl w-11/12 lg:w-1/2 rounded-l-[5em] z-[1]">
        <div className="mx-auto max-w-md mt-24">
          <div className="flex justify-center flex-col">
            <img
              className="my-2 mx-auto w-[4em]"
              src={'/images/radio-waves.png'}
              alt=""
            />
            <span className="text-xl text-center mt-2 font-bold text-gray-800">
              Vocal Management App
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
