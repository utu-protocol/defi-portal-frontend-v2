import { configureStore, Store } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'


const persistConfig = {
    key: 'utu-defi-dashboard',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store as Store<any, any>);
// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type AppDispatch = typeof store.dispatch;

export default store;
