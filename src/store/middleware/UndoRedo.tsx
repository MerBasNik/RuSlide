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

    const historyHotKeys = useCallback(
        (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                (event.key === "z" || event.key === "Z") &&
                canUndo
            ) {
                event.preventDefault();
                dispatch(undo());
            }
            if ((event.metaKey || event.ctrlKey) && (event.key === "y" || event.key === "Y")) {
                event.preventDefault();
                if (canRedo) {
                    dispatch(redo());
                }
            }
            if (
                (event.metaKey || event.ctrlKey) &&
                (event.key === "z" || event.key === "Z") &&
                canRedo
            ) {
                event.preventDefault();
                dispatch(redo());
            }
        },
        [dispatch, canUndo, canRedo]
    );

    const saveHotKeys = useCallback(
        (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && (event.key === "s" || event.key === "S")) {
                event.preventDefault();
                savePresentation(presentation);
            }
        },
        [dispatch, canUndo, canRedo]
    );

    useEffect(() => {
        document.addEventListener("keydown", historyHotKeys);
        document.addEventListener("keydown", saveHotKeys);
        return () => {
            document.removeEventListener("keydown", historyHotKeys);
            document.removeEventListener("keydown", saveHotKeys);
        };
    }, [historyHotKeys, saveHotKeys]);
    return null;
};
export default UndoRedoManager;
