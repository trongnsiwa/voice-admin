import Header from '@components/common/header';
import Sidebar from '@components/common/sidebar';
import { useAppSelector } from '@redux/store/hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  // if (!currentUser) {
  //   router.push({
  //     pathname: '/login',
  //     query: { from: router.asPath },
  //   });
  // }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen drawer">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto w-[1640px] drawer-content">
          <Header />
          <main className="w-[1640px]">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
