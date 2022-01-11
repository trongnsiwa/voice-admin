import { toggleSidebar } from '@redux/actions/sidebar-action';
import { useAppDispatch, useAppSelector } from '@redux/store/hooks';
import { sidebars } from '@shared/routes/sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const Sidebar = () => {
  // selctor & dispatch
  const { open } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  // media query
  const matches = useMediaQuery('(min-width: 768px)');

  // event
  useEffect(() => {
    matches && dispatch(toggleSidebar(true));
  }, [dispatch, matches]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-side shadow-lg h-screen"
            initial={{ x: '-100%' }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '-100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <motion.ul
              className="menu p-4 overflow-y-auto w-80 text-base-content"
              initial="closed"
              animate="open"
              variants={sideVariants}
            >
              <li>
                <div className="flex items-center mt-5">
                  <img className="h-8" src="/images/logo.png" alt="" />
                  <p className="text-lg pl-2 leading-none text-center">
                    Vocal Management App
                  </p>
                </div>
              </li>
              {sidebars &&
                sidebars.map((bar, index) => (
                  <li key={`bar_${index}`}>
                    <Link href={bar.path}>
                      <a>
                        {bar.icon}
                        {bar.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
