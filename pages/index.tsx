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
      <>Dashboard</>
    </Layout>
  );
};

export default Home;
