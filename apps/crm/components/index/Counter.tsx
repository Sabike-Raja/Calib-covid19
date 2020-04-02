import React from 'react';
import { NextPage } from 'next';
import { PageContext } from '../../types/PageContext';
import { fetchStarsCount } from '../../store/reducers/countSlice';

const Counter: NextPage<{ counted: number }, void> = ({ counted }) => (
  <h2>Counted: {counted}</h2>
);
Counter.getInitialProps = async ({ reduxStore }: PageContext) => {
  reduxStore.dispatch(fetchStarsCount());
};
export default Counter;
