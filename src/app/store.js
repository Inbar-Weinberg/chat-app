import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "../features/loginState/LoginSlice.js";


export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
