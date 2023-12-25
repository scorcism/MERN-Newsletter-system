import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "../features/ComponentsRender.slice";
import authReducer from "../features/userAuth.slice";
import { utilApi } from "../service/utilApi";

export default configureStore({
  reducer: {
    components: componentsReducer,
    auth: authReducer,
    [utilApi.reducerPath]: utilApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(utilApi.middleware),
});
