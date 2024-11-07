import { configureStore } from '@reduxjs/toolkit';
import { userReducer, siteReducer } from './usersSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        sites: siteReducer,
    },
});

// this is the type for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


