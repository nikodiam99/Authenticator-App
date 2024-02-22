import {combineReducers, configureStore} from '@reduxjs/toolkit';
//userslice.reducer was exported as default so we can change name
//to userReducer
import userReducer  from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //save our data inside local storage of browser

const rootReducer = combineReducers({ user: userReducer});

const persistConfig = {
    key: 'root',
    version: 1, 
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:  persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //prevents some errors while working with redux
        serializableCheck:false,
    }),
  });

  export const persistor = persistStore(store);