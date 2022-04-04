import { createStore, combineReducers } from "redux";
import { modelReducer } from "../reducer";

const reducers = combineReducers({
  modelReducer,
});

export const store = createStore(reducers);
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
