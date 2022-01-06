import Header from '@components/common/header';
import { ReactNode } from 'react';

export const GuestLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    <main className="h-full">{children}</main>
  </div>
);
