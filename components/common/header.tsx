import { logoutAction } from '@redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import { RiMenu2Line } from 'react-icons/ri';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { IoLogOutOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';
import { toggleSidebar } from '@redux/actions/sidebar-action';

const Header = () => {
  // states
  const { value, setFalse, toggle } = useBoolean(false);

  // ref
  const menuRef = useRef(null);

  // selectors
  const { open } = useAppSelector((state) => state.sidebar);

  // dispatch
  const dispatch = useAppDispatch();

  // router
  const router = useRouter();

  const logOut = () => {
    // dispatch(logoutAction());
    // router.push('/signin');
    // router.reload();
    console.log('hi');
  };

  useOnClickOutside(menuRef, setFalse);

  return (
    <>
      <motion.div className="navbar mb-2 shadow-lg">
        <div className="flex-1">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <label
            htmlFor="drawer"
            className="btn btn-circle btn-ghost drawer-button"
            onClick={() => dispatch(toggleSidebar(!open))}
          >
            <RiMenu2Line className="inline-block w-6 h-6" />
          </label>
        </div>
        <div className="flex-none">
          <button className="btn btn-circle btn-ghost">
            <VscBell className="inline-block w-6 h-6" />
          </button>
        </div>
        <div className="flex-none relative">
          <div className="avatar cursor-pointer" onClick={toggle} ref={menuRef}>
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
            className="menu w-[10em] py-3 shadow-md bg-base-100 rounded-sm absolute left-[-7em] bottom-[-5em]"
          >
            <li>
              <a onClick={logOut}>
                <IoLogOutOutline className="inline-block w-5 h-5 mr-2" />
                Logout
              </a>
            </li>
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
