import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial Value
const initialState = {
  data: {
    token: "",
    email: "",
    isLoggedIn: false,
  },
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    logginUser: (state, action) => {
      state.data.token = action.payload.token;
      state.data.email = action.payload.email;
      state.data.isLoggedIn = true;
    },
    logoutUser: (state) => {
        Cookies.remove("AUTH_TOKEN");
        Cookies.remove("AUTH_EMAIL");
      state.data.token = "";
      state.data.email = "";
      state.data.isLoggedIn = false;
    },
  },
});

export const { logginUser, logoutUser } = componentsSlice.actions;

export default componentsSlice.reducer;
