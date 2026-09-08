import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthUser} from '@src/types/types';

type AuthState = {
  user: AuthUser | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  isHydrated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
    clearSession: state => {
      state.user = null;
    },
  },
});

export const {setSession, setHydrated, clearSession} = authSlice.actions;

export default authSlice.reducer;
