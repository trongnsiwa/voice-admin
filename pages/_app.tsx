import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@shared/styles/global.css';
import '@shared/styles/nprocess.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { store } from '@redux/store/store';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from 'react-query';

const TopProgressBar = dynamic(
  () => {
    return import('@components/top-progress-bar');
  },
  { ssr: false }
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TopProgressBar />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
