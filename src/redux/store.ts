import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {homeSlice} from './slices/homeSlice';
import {authSlice} from './slices/authSlice';
import {userSlice} from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  home: homeSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const selectUser = (state: AppState) => state.auth.user;
export const selectIsHydrated = (state: AppState) => state.auth.isHydrated;
export const selectIsAuthenticated = (state: AppState) => Boolean(state.auth.user);
export const selectProfile = (state: AppState) => state.user;
export const selectCount = (state: AppState) => state.home.value;
