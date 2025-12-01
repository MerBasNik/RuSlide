import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.tsx';
import { undo, redo } from '../reducers/historySlice.ts';
import { selectCanUndo, selectCanRedo } from '../reducers/historySlice.ts';

const UndoRedoManager = () => {
    const dispatch = useAppDispatch();
    const canUndo = useAppSelector(selectCanUndo);
    const canRedo = useAppSelector(selectCanRedo);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'z' && canUndo) {
            event.preventDefault();
            dispatch(undo());
        }
        if ((event.metaKey || event.ctrlKey) && event.key === 'y' && canRedo) {
            event.preventDefault();
            dispatch(redo());
        }
        if ((event.metaKey || event.ctrlKey) && event.key === 'z' && canRedo) {
            event.preventDefault();
            dispatch(redo());
        }
    }, [dispatch, canUndo, canRedo]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    return null;
};
export default UndoRedoManager;