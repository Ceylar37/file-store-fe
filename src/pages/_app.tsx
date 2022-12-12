import Header from '@general/Header';
import PopupProvider from '@lib/Popup/PopupProvider';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { index } from '@store/index';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex h-screen w-screen'>
      <Provider store={index}>
        <PopupProvider>
          <Header />
          <Component {...pageProps} />
        </PopupProvider>
      </Provider>
    </div>
  );
}
