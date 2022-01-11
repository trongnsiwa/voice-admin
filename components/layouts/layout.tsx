import Header from '@components/common/header';
import Sidebar from '@components/common/sidebar';
import { ReactNode, useRef } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen drawer">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full drawer-content">
        <Header />
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
