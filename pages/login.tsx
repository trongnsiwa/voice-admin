import GuestLayout from '@components/layouts/guest-layout';
import { ERRORS } from '@constants/error-code';
import { clearMessage, hideLoader, login, showLoader } from '@redux/actions';
import { authSelector, messageSelector } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { FormikState, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';
import * as Yup from 'yup';

const Login = () => {
  // states
  const { toggle, value } = useBoolean(false);

  // selectors
  const { isLoggedIn } = useAppSelector(authSelector);
  const message = useAppSelector(messageSelector);

  // dispatch
  const dispatch = useAppDispatch();

  // router
  const router = useRouter();

  // yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(ERRORS.ERR_REQUIRED).trim(),
    password: Yup.string().required(ERRORS.ERR_REQUIRED).trim(),
  });

  const handleSumit = (
    values: { username: any; password: any },
    resetForm: {
      (
        nextState?:
          | Partial<FormikState<{ username: string; password: string }>>
          | undefined
      ): void;
      (): void;
    }
  ) => {
    const username = values.username;
    const password = values.password;

    dispatch(showLoader());

    login(username, password, dispatch)
      .then(() => {
        resetForm();
        router.push('/');
      })
      .catch((error) => dispatch(hideLoader()));
  };

  // formik
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => handleSumit(values, resetForm),
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
    <GuestLayout>
      <div className="w-screen h-screen flex relative">
        <div className="bg-hero bg-cover h-screen w-0 md:w-1/2"></div>
        <div className="h-full bg-primary-dark text-white shadow-2xl shadow-secondary-dark w-full lg:w-1/2 z-[1] mx-auto flex justify-center items-center">
          <div className="max-w-sm md:max-w-md w-full">
            <div className="flex justify-center flex-col">
              <img
                className="my-2 mx-auto w-28"
                src={'/images/logo.png'}
                alt=""
              />
              <span className="text-xl text-center mt-2 font-bold text-secondary-dark">
                Vocal Admin Management
              </span>
            </div>
            <form onSubmit={formik.handleSubmit} className="mt-8">
              <p className="font-bold text-lg mb-5 text-white">Login</p>
              {message && <p className="text-error mb-2">{message}</p>}

              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text text-white">Username</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`input input-bordered input-ghost focus:border-secondary-dark focus:bg-stone-600 hover:border-secondary-dark focus:text-white ${
                    ((formik.touched.username && formik.errors.username) ||
                      message) &&
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
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type={value ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`input input-bordered input-ghost focus:border-secondary-dark focus:text-white focus:bg-stone-600 hover:border-secondary-dark ${
                    ((formik.touched.password && formik.errors.password) ||
                      message) &&
                    'border-error focus:border-error hover:border-error'
                  }`}
                />
                <a
                  className={`absolute right-3 ${
                    formik.touched.password && formik.errors.password
                      ? 'top-[43%]'
                      : 'top-[60%]'
                  } cursor-pointer text-sm hover:text-secondary`}
                  onClick={toggle}
                >
                  Show
                </a>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-error text-sm mt-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end">
                <a className="text-sm mt-2 link no-underline text-white hover:text-secondary">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-14 btn btn-primary hover:bg-stone-600 hover:border-secondary-dark hover:text-secondary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
