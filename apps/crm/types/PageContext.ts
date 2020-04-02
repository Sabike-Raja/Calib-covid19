import { NextPageContext } from 'next';

export type PageContext = NextPageContext & { reduxStore: any };
