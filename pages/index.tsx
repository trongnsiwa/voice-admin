import Layout from '@components/layouts/layout';
import { authSelector, selectAuth } from '@redux/selectors';
import { useAppSelector } from '@redux/store/hooks';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from './login';

const Home: NextPage = () => {
  const { user, isLoggedIn } = useAppSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    if (!user || isLoggedIn === false) {
      router.replace('/login');
    }
  }, []);

  return (
    <Layout>
      <div className="pt-28">Dashboard</div>
    </Layout>
  );
};

export default Home;
