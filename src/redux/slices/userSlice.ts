import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const profilePic = require('@assets/images/profile-pic.png');

type UserState = {
  email: string | null;
  username: string;
  displayName: string;
  bio: string;
  avatar: number;
};

const initialState: UserState = {
  email: null,
  username: 'hgq287',
  displayName: 'Hg Q.',
  bio: 'Mobile App Solutions Architect & Open Source Enthusiast',
  avatar: profilePic,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<{email?: string; username?: string}>,
    ) => {
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.username !== undefined) {
        state.username = action.payload.username;
      }
    },
  },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
