import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { expenseSlice } from "./expense.slice";

const combinedReducer = combineReducers({
  expenseList: expenseSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  timeout: 0, // The code base checks for falsy, so 0 disables
}

const rootReducer = (state, action) => {
  if (action.type === 'resetAll/pending') {
    // clear all states except auth state
    const { auth } = state;
    state = { auth };
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: [thunk]
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;

/**
 * @description Hooks for using 'dispatch' and 'stateSelector' redux handlers.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
