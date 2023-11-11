import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import { authSlice } from './features/login/authSlice';
import { meetingSlice } from './features/meetings/meetingSlice';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, 
        auth: authSlice.reducer,
        meeting: meetingSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});