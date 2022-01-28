import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import walletReducer from './reducers/wallet.reducers'
import oceanReducer from './reducers/ocean.reducers'
import defiReducer from './reducers/defi.reduces'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  wallet: walletReducer,
  ocean: oceanReducer,
  defi: defiReducer,
})
const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch

export default store
