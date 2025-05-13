import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userData";

const store = configureStore({
    reducer: {
      user: userReducer,
    },
});

// Type untuk dipakai di komponen
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
