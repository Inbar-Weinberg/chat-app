import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoggedInUpdate: (state, { payload }) => {
      state.email = payload.email;
    },
  },
});

export const {userLoggedInUpdate} = loginSlice.actions;

export const emailSelector = (state) => state.login.email;

export default loginSlice.reducer;
