import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dark: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    setDark: (state) => {
        state.dark = true;
    },
    setLight: (state) => {
        state.dark = false;
    },
});

export default themeSlice.reducer;
export const { setDark, setLight } = themeSlice.actions;
