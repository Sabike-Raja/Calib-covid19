import { createSlice, Slice, Dispatch } from '@reduxjs/toolkit';
import { CountState } from '../../types/CountState';
import { fetchStarsCountApi } from '../../apis/starsApi';

const initialState: CountState = {
  count: 0
};

const counterSlice: Slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CountState, { type, payload }) => {
      state.count += 1;
    },
    decrement: (state: CountState, { type, payload }) => {
      state.count -= 1;
    },
    assign: (state: CountState, { payload }) => {
      state.count = payload;
    },
    error: (state: CountState) => {
      state.count = 0;
    }
  }
});

export const { increment, decrement, assign, error } = counterSlice.actions;

export default counterSlice.reducer;

export const fetchStarsCount = (): any => {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      const starsCount = await fetchStarsCountApi();
      dispatch(assign(starsCount));
    } catch (err) {
      dispatch(error(err));
    }
  };
};
