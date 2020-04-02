import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increment, decrement } from '../store/reducers/countSlice';
import { AppState } from '../types/AppState';
import Counter from '../components/index/Counter';
import { NextPage } from 'next';
import { Dispatch } from '@reduxjs/toolkit';
import { PageContext } from '../types/PageContext';

const IndexPage: NextPage<{}, {}> = () => {
  const counted: number = useSelector((state: AppState) => state.count.count);
  const dispatch: Dispatch = useDispatch();

  return (
    <div>
      <h1>Simple implement Next.js With Redux Toolkit</h1>
      <Counter counted={counted} />
      <hr />
      <button onClick={() => dispatch(increment(null))}>Increment</button>
      &nbsp;
      <button onClick={() => dispatch(decrement(null))}>decrement</button>
    </div>
  );
};

export default IndexPage;
