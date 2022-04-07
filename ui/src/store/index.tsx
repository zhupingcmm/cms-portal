import {
  configureStore,
  createListenerMiddleware,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import modelReducer from "../reducer/model";
import { test } from "../../redux-middleware";

export const store = configureStore({
  reducer: {
    modelReducer,
  },
  middleware: new MiddlewareArray().concat(test),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
