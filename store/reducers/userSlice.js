"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogIn: (state) => {
      state.isLoggedIn = true;
    },
    userLogOut: (state) => {
      state.isLoggedIn = false;
    },
    setUserData: (state, action) => {
      state.username = action.payload;
    },
    resetUserData: (state) => {
      state = initialState;
    },
  },
});

export const { userLogIn, userLogOut, setUserData, resetUserData } =
  userSlice.actions;

export default userSlice.reducer;
