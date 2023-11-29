
import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./reducer/BookSlice";

export const store = configureStore({
    reducer : {
        app : bookSlice.reducer
    }
})