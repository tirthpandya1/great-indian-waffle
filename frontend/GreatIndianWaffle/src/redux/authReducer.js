import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    profile: null,
    loginError: null,
    isLoading: false,
    loyaltyPoints: 0,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.loginError = action.payload;
      state.user = null;
      state.profile = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.profile = null;
      state.loginError = null;
      state.loyaltyPoints = 0;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateLoyaltyPoints: (state, action) => {
      state.loyaltyPoints = action.payload;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateProfile,
  updateLoyaltyPoints 
} = authSlice.actions;

export default authSlice.reducer;
