import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import { RiMenu2Line } from 'react-icons/ri';
import { VscBell } from 'react-icons/vsc';
import { IoLogOutOutline } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean, useMediaQuery, useOnClickOutside } from 'usehooks-ts';
import { toggleSidebar } from '@redux/actions/sidebar-action';
import { authSelector, sidebarSelector } from '@redux/selectors';
import { logoutAction } from '@redux/actions';

const Header = () => {
  // states
  const { value, setFalse, toggle } = useBoolean(false);

  // ref
  const menuRef = useRef(null);

  // selectors
  const open = useAppSelector(sidebarSelector);
  const { user } = useAppSelector(authSelector);

  // dispatch
  const dispatch = useAppDispatch();

  // router
  const router = useRouter();

  const matches = useMediaQuery('(min-width: 1440px)');

  const logOut = () => {
    dispatch(logoutAction());
    router.push('/login');
  };

  useOnClickOutside(menuRef, setFalse);

  return (
    <AnimatePresence initial={false}>
      <div
        className={`mb-2 bg-white z-50 shadow-lg px-3 fixed ${
          !open ? 'w-[calc(100%-80px)]' : 'w-[calc(100%-280px)]'
        }`}
      >
        <div className="navbar">
          <div className="flex-1">
            <input
              id="drawer"
              type="checkbox"
              className={matches ? 'hidden' : `drawer-toggle matches`}
            />
            <label
              htmlFor="drawer"
              className={
                matches ? 'hidden' : `btn btn-circle btn-ghost drawer-button`
              }
              onClick={() => dispatch(toggleSidebar(!open))}
            >
              <RiMenu2Line className="inline-block w-6 h-6" />
            </label>
          </div>
          <div className="flex-none pr-3">
            <button className="btn btn-circle btn-ghost">
              <VscBell className="inline-block w-6 h-6" />
            </button>
          </div>
          <div className="flex-none relative border-l h-7">
            <p className={`px-3 text-sm font-semibold text-voice-ylw_dark`}>
              {user?.firstName} {user?.lastName}
            </p>
            <div
              className="avatar cursor-pointer"
              onClick={toggle}
              ref={menuRef}
            >
              <div className="rounded-full w-10 h-10 m-1">
                <img
                  src="https://ik.imagekit.io/tnyyngwxvx9/default_28FGC8ZwZ.png"
                  alt=""
                />
              </div>
            </div>
            <motion.ul
              animate={value ? 'open' : 'closed'}
              variants={{
                closed: { opacity: 0, y: '-10%' },
                open: {
                  opacity: 1,
                  y: '0%',
                },
              }}
              transition={{ duration: 0.1, easings: ['easeOut', 'easeIn'] }}
              className="menu w-[10em] py-3 shadow-sm bg-base-100 rounded-sm absolute right-0 bottom-[-5em]"
            >
              <li>
                <a onClick={logOut}>
                  <IoLogOutOutline className="inline-block w-5 h-5 mr-2" />
                  Logout
                </a>
              </li>
            </motion.ul>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Header;
