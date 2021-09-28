import { combineReducers } from '@reduxjs/toolkit';
import metaMaskSlice from '../reduxSlice/metaMaskSlice';

const rootReducer = combineReducers({
  metaMask: metaMaskSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
