import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: undefined,
  displayName: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserState: (state, { payload }) => {
      state.email = payload.email;
      state.displayName = payload.displayName;
    },
  },
});

export const { setUserState } = loginSlice.actions;

export const emailSelector = (state) => state.login.email;
export const displayNameSelector = (state) => state.login.displayName;

export default loginSlice.reducer;
