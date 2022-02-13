import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@shared/styles/global.css';
import '@shared/styles/nprocess.css';
import '@shared/styles/loader.css';
import '@shared/styles/calendar.css';
import { store } from '@redux/store/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
