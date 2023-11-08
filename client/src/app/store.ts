import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import organisationReducer from "../features/organisation/organisationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organisation: organisationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
