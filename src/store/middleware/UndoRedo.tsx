import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import { undo, redo } from "../reducers/historySlice.ts";
import { selectCanUndo, selectCanRedo } from "../reducers/historySlice.ts";
import presentationService from "../../../services/appwrite/presentation.ts";

const UndoRedoManager = () => {
    const dispatch = useAppDispatch();
    const canUndo = useAppSelector(selectCanUndo);
    const canRedo = useAppSelector(selectCanRedo);
    const presentation = useAppSelector(state => state.presentation);
    const { savePresentation } = presentationService();

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const isCtrlOrCmd = event.metaKey || event.ctrlKey;

            if (!isCtrlOrCmd) return;

            switch (event.key.toLowerCase()) {
                case "z":
                    event.preventDefault();

                    if (event.shiftKey && canRedo) {
                        dispatch(redo());
                    } else if (canUndo && !event.shiftKey) {
                        dispatch(undo());
                    }
                    break;

                case "y":
                    if (canRedo) {
                        event.preventDefault();
                        dispatch(redo());
                    }
                    break;

                case "s":
                    event.preventDefault();
                    savePresentation(presentation);
                    break;
            }
        },
        [dispatch, canUndo, canRedo, presentation, savePresentation]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return null;
};

export default UndoRedoManager;