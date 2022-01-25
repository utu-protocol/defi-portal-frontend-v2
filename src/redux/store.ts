import { configureStore, Store } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import walletReducer from './reducers/wallet.reducers'
import oceanReducer from './reducers/ocean.reducers';
import defiReducer from './reducers/defi.reduces'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  wallet: walletReducer,
  ocean: oceanReducer,
  defi: defiReducer,
})
const persistConfig = {
  key: 'utu-defi-dashboard',
  storage,
  whitelist: ['wallet'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store as Store<any, any>)

export type AppDispatch = typeof store.dispatch

export default store
