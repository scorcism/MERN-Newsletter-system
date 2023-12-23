import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "../features/ComponentsRender.slice";

export default configureStore({
  reducer: {
    components: componentsReducer
  },
});
