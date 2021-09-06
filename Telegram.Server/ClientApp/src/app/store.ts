import {ThunkAction, Action, combineReducers, createStore} from '@reduxjs/toolkit';
import {authorizationReducer} from "./slices/authorizationSlice";
import {chatsReducer} from "./slices/chatsSlice";

const reducers = combineReducers({
  authorization: authorizationReducer,
  chats: chatsReducer,
})
export const store = createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootReducer = ReturnType<typeof reducers>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;