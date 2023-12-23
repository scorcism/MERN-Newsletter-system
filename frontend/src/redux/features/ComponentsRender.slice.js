import { createSlice } from "@reduxjs/toolkit";

// Initial Value
const initialState = {
  toRender: {
    home: true,
    audience_type: false,
    audience: false,
    contacts: false,
    send_news_letters: false,
    apis: false,
  },
  alert: {
    toRender: false,
    type: "",
    text: "",
  },
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setToRender: (state, action) => {
      let actionType = action.payload;
      let tmp = {
        home: actionType === "home",
        audience_type: actionType === "audience_type",
        audience: actionType === "audience",
        contacts: actionType === "contacts",
        send_news_letters: actionType === "send_news_letters",
        apis: actionType === "apis",
      };
      state.toRender = tmp;
    },
    showAlert: (state, action) => {
      state.alert.toRender = false;
      let type = action.payload.alert_type;
      let alrt = {
        toRender: true,
        type,
        text: action.payload.text,
      };
      state.alert = alrt;
    },
    hideAlert: (state) => {
      state.alert.toRender = false;
    },
  },
});

export const { setToRender, showAlert, hideAlert } = componentsSlice.actions;

export default componentsSlice.reducer;
