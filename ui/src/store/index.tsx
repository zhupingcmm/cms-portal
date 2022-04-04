import { configureStore } from '@reduxjs/toolkit';
import  modelReducer from "../reducer/model";


export const store = configureStore({
    reducer: {
        modelReducer
    }
});
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
