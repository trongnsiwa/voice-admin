import { toggleSidebar } from '@redux/actions/sidebar-action';
import { sidebarSelector } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { sidebars } from '@shared/routes/sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const Sidebar = () => {
  const router = useRouter();

  // selctor & dispatch
  const open = useAppSelector(sidebarSelector);
  const dispatch = useAppDispatch();

  // media query
  const matches = useMediaQuery('(min-width: 1440px)');

  // event
  useEffect(() => {
    matches && dispatch(toggleSidebar(true));
  }, [dispatch, matches]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <>
          <motion.div
            className="drawer-side bg-primary shadow-lg h-screen"
            initial={{ width: '0', x: '-100%' }}
            animate={{
              width: '280px',
              x: 0,
            }}
            exit={{
              width: '0',
              x: '-100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <ul className="menu p-4 overflow-y-auto text-base-content">
              <li className="mb-7 pb-3 border-b-2 border-stone-600">
                <div className="m-3">
                  <img className="h-14" src="/images/logo.png" alt="" />
                </div>
              </li>
              {sidebars &&
                sidebars.map((bar, index) => (
                  <li
                    key={`bar_${index}`}
                    className={`mb-2 hover:bg-stone-500 hover:rounded-lg  ${
                      router.pathname.endsWith(bar.path)
                        ? 'text-secondary font-bold bg-stone-500 rounded-lg'
                        : 'text-gray-100'
                    }`}
                  >
                    <Link href={bar.path}>
                      <a>
                        {bar.icon}
                        <span className={'ml-3'}>{bar.name}</span>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className="drawer-side bg-primary shadow-lg h-screen"
            initial={{ width: '0', x: '-100%' }}
            animate={{
              width: '90px',
              x: 0,
            }}
            exit={{
              width: '0',
              x: '-100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <ul className="menu p-4 overflow-y-auto text-base-content">
              <li className="mb-7 pb-3 border-b border-stone-500">
                <div className="m-3">
                  <img className="h-full" src="/images/logo.png" alt="" />
                </div>
              </li>
              {sidebars &&
                sidebars.map((bar, index) => (
                  <li
                    key={`bar_${index}`}
                    className={`mb-2 hover:bg-stone-500 hover:rounded-lg  ${
                      router.pathname.endsWith(bar.path)
                        ? 'text-secondary font-bold bg-stone-500 rounded-lg'
                        : 'text-gray-100'
                    }`}
                  >
                    <Link href={bar.path}>
                      <a>{bar.icon}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
