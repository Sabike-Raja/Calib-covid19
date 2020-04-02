import { PageContext } from './PageContext';
import { NextRouter } from 'next/dist/client/router';
import { NextComponentType, NextPageContext } from 'next';
import { AppTreeType } from 'next/dist/next-server/lib/utils';

export declare type PageContextType<R extends NextRouter = NextRouter> = {
  Component: NextComponentType<NextPageContext>;
  AppTree: AppTreeType;
  ctx: PageContext;
  router: R;
};
