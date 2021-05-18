import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: undefined,
  displayName: undefined,
  uid: undefined,

  userUpdateComplete: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserState: (state, { payload }) => {
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.userId;
      state.loggedIn = !!payload.email;
    },
    setUserUpdateComplete: (state, { payload }) => {
      state.userUpdateComplete = payload.userUpdateComplete;
    },
  },
});

export const { setUserState, setUserUpdateComplete } = loginSlice.actions;

export const userUpdateCompleteSelector = (state) => state.login.userUpdateComplete;
export const emailSelector = (state) => state.login.email;
export const displayNameSelector = (state) => state.login.displayName;
export const uidSelector = (state) => state.login.uid;

export const loggedInSelector = (state) => state.login.loggedIn;

export default loginSlice.reducer;
