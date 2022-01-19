import Layout from '@components/layouts/layout';
import { useAppSelector } from '@redux/store/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import Login from './login';

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  // if (!user || user.isLoggedIn === false) {
  //   return <Login />;
  // }

  return (
    <Layout>
      <div className="pt-28">Dashboard</div>
    </Layout>
  );
};

export default Home;
