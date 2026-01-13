import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import darkReducer from "./features/themeSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        dark: darkReducer,
    },
});

export default store;
