import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@shared/styles/global.css';
import { store } from '@redux/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
