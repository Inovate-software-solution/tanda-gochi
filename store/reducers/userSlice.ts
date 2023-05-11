'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    value: string;
    isLoggedIn : boolean
    userEmail: string | null

}

const initialState: UserState = {
    value: "username",
    isLoggedIn : true,
    userEmail: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userLogIn: (state) => {state.isLoggedIn = true},
        userLogOut: (state) => {state.isLoggedIn = false},
        setUserData: (state, action) => {state.userEmail = action.payload; console.log("action payload : "+action.payload)},
        resetUserData: (state) => {state = initialState},
    }
})

export const {userLogIn, userLogOut, setUserData, resetUserData} = userSlice.actions;

export default userSlice.reducer;