import { useState, useCallback, useEffect } from "react";

export function useUndoStack() {
    const [past, setPast] = useState<any[]>([]);
    const [future, setFuture] = useState<any[]>([]);

    const push = useCallback((doFn: any, undoFn: any, ...argsToClone: any[]) => {
        const clonedArgs = structuredClone(argsToClone);
        const action = {
            doWithData() { doFn(...clonedArgs); },
            undoWithData() { undoFn(...clonedArgs); },
        };
        action.doWithData();
        setPast(prev => [...prev, action]);
        setFuture([]);
    }, [past]);

    const undo = useCallback(() => {
        if (past.length === 0) return;
        const action = past[past.length - 1];
        action.undoWithData();
        setPast(prev => prev.slice(0, -1));
        setFuture(prev => [action, ...prev]);
    }, [past]);

    const redo = useCallback(() => {
        if (future.length === 0) return;
        const action = future[0];
        action.doWithData();
        setPast(prev => [...prev, action]);
        setFuture(prev => prev.slice(1));
    }, [future]);

    const clear = useCallback(() => {
        setPast([]);
        setFuture([]);
        return true;
    }, []);

    const undoAvailable = past.length > 0;
    const redoAvailable = future.length > 0;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey && undoAvailable) {
            event.preventDefault();
            undo();
        }
        if ((event.metaKey || event.ctrlKey) && event.key === 'y' && redoAvailable) {
            event.preventDefault();
            redo();
        }
    }, [undo, redo, undoAvailable, redoAvailable]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    return {
        push,
        undo,
        redo,
        clear,
        undoAvailable,
        redoAvailable,
    };
}