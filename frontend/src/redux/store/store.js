import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "../features/ComponentsRender.slice";
import authReducer from "../features/userAuth.slice";

export default configureStore({
  reducer: {
    components: componentsReducer,
    auth: authReducer,
  },
});
