import type { Middleware } from "@reduxjs/toolkit";
import {
    updateHistory,
    undo,
    redo,
} from "../reducers/historySlice.ts";
import { restoreState } from "../reducers/PresentationSlice.ts";

export const undoRedoMiddleware: Middleware = store => {
    return next => action => {
        if (undo.match(action)) {
            const state = store.getState();
            const history = state.history;

            if (history.past.length === 0) return;
            const previousState = history.past[history.past.length - 1];

            next(restoreState(previousState));
            next(updateHistory({
                past: history.past.slice(0, -1),
                present: previousState,
                future: [history.present, ...history.future]
            }));
            return;
        }

        if (redo.match(action)) {
            const state = store.getState();
            const history = state.history;
            if (history.future.length === 0) return;
            const nextState = history.future[0];
            next(restoreState(nextState));
            next(updateHistory({
                past: [...history.past, history.present],
                present: nextState,
                future: history.future.slice(1)
            }));
            return;
        }

        if (restoreState.match(action)) {
            return next(action);
        }

        const prevState = store.getState().presentation;
        const prevHistory = store.getState().history;
        const result = next(action);

        const newState = store.getState().presentation;
        next(updateHistory({
            past: [...prevHistory.past, prevState],
            present: newState,
            future: []
        }));
        return result;
    };
};