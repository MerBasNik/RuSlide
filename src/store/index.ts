import { configureStore } from "@reduxjs/toolkit";
import presentationReducer from "./reducers/PresentationSlice.ts";
import historyReducer from "./reducers/historySlice.ts";
import { undoRedoMiddleware } from "./middleware/undoRedoMiddleware.ts";

export const store = configureStore({
    reducer: {
        presentation: presentationReducer,
        history: historyReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['history/updateHistory', 'presentation/restoreState'],
                ignoredPaths: ['history.past', 'history.future', 'history.present']
            }
        }).concat(undoRedoMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;