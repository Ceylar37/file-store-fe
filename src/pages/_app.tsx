import PopupProvider from '@lib/Popup/PopupProvider';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { index } from '@store/index';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (
      Component as NextPage & {
        getLayout: (page: JSX.Element) => JSX.Element;
      }
    ).getLayout || ((page: JSX.Element) => <>{page}</>);

  return (
    <div>
      <Provider store={index}>
        <PopupProvider>{getLayout(<Component {...pageProps} />)}</PopupProvider>
      </Provider>
    </div>
  );
}
