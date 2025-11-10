import { configureStore } from "@reduxjs/toolkit";
import presentationReducer from "./reducers/PresentationSlice.ts";

export const store = configureStore({
    reducer: {
        presentation: presentationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;