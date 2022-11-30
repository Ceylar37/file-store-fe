import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthInitialState, Profile } from '@store/reducers/auth/types';

const initialState: AuthInitialState = {
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer
export const {setProfileData} = authSlice.actions