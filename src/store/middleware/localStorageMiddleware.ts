import { type Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("presentationState", JSON.stringify(state.presentation));
    return result;
};
