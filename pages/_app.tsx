import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@shared/styles/global.css';
import '@shared/styles/nprocess.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { store } from '@redux/store/store';
import dynamic from 'next/dynamic';

const TopProgressBar = dynamic(
  () => {
    return import('@components/top-progress-bar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TopProgressBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
