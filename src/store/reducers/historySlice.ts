import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';

interface HistoryState {
    past: any[];
    present: any;
    future: any[];
}

const initialState: HistoryState = {
    past: [],
    present: null,
    future: []
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        updateHistory: (state, action: PayloadAction<HistoryState>) => {
            console.log("restoreStateAction 123", state, action);
            return action.payload;
        },
        undo: (state) => {
            return state;
        },
        redo: (state) => {
            return state;
        }
    }
});

export const { updateHistory, undo, redo } = historySlice.actions;

export const selectCanUndo = (state: RootState) => state.history.past.length > 0;
export const selectCanRedo = (state: RootState) => state.history.future.length > 0;

export default historySlice.reducer;