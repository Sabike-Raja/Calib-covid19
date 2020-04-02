import { combineReducers } from 'redux';

import count from './reducers/countSlice';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { AppState } from '../types/AppState';

const rootReducer = combineReducers({
  count
});

export const initializeStore = (store?: AppState): EnhancedStore => {
  return configureStore({
    reducer: rootReducer
  });
};
