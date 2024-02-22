import {configureStore} from '@reduxjs/toolkit';
//userslice.reducer was exported as default so we can change name
//to userReducer
import userReducer  from './user/userSlice';

export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //prevents some errors while working with redux
        serializableCheck:false,
    }),
  });