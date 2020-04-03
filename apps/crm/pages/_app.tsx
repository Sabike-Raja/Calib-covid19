import React from 'react';
import { AppContext, AppProps, AppInitialProps } from 'next/app';
import withReduxStore from '../utils/with-redux-store';
import { Provider } from 'react-redux';
import { AppState } from '../types/AppState';

import './index.scss'
import '../containers/ChartView/style.scss'
import '../containers/Dashboard/style.scss'
import '../containers/TableView/style.scss'

export type AppPropsWithStore = AppProps & { reduxStore: AppState };

const App = ({
  Component,
  pageProps,
  reduxStore
}: AppContext & AppInitialProps & { reduxStore: any }) => {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  );
};

App.getInitialProps = async ({
  Component,
  ctx
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps
  };
};

export default withReduxStore(App as any);
