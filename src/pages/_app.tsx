import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { index } from '@store/index';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={index}>
      <Component {...pageProps} />
    </Provider>
  );
}