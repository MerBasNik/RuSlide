import { configureStore } from "@reduxjs/toolkit";
import presentationReducer from "./reducers/PresentationSlice.ts";
import historyReducer from "./reducers/historySlice.ts";
import { undoRedoMiddleware } from "./middleware/undoRedoMiddleware.ts";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware.ts";

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("presentationState");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Error loading state from localStorage:", e);
        return undefined;
    }
};

const preloadedState = {
    presentation: loadFromLocalStorage(),
};

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
        }).concat(undoRedoMiddleware).concat(localStorageMiddleware),
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
