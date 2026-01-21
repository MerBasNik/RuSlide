// import { useEffect, useCallback } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
// import { undo, redo } from "../reducers/historySlice.ts";
// import { selectCanUndo, selectCanRedo } from "../reducers/historySlice.ts";
// import presentationService from "../../../services/appwrite/presentation.ts";
//
// const UndoRedoManager = () => {
//     const dispatch = useAppDispatch();
//     const canUndo = useAppSelector(selectCanUndo);
//     const canRedo = useAppSelector(selectCanRedo);
//     const presentation = useAppSelector(state => state.presentation);
//     const { savePresentation } = presentationService();
//
//     const historyHotKeys = useCallback(
//         (event: KeyboardEvent) => {
//             if (
//                 (event.metaKey || event.ctrlKey) &&
//                 (event.key === "z" || event.key === "Z") &&
//                 canUndo
//             ) {
//                 event.preventDefault();
//                 dispatch(undo());
//             }
//             if ((event.metaKey || event.ctrlKey) && (event.key === "y" || event.key === "Y")) {
//                 event.preventDefault();
//                 if (canRedo) {
//                     dispatch(redo());
//                 }
//             }
//             if (
//                 (event.metaKey || event.ctrlKey) &&
//                 (event.key === "z" || event.key === "Z") &&
//                 canRedo
//             ) {
//                 event.preventDefault();
//                 dispatch(redo());
//             }
//         },
//         [dispatch, canUndo, canRedo]
//     );
//
//     const saveHotKeys = useCallback(
//         (event: KeyboardEvent) => {
//             if ((event.metaKey || event.ctrlKey) && (event.key === "s" || event.key === "S")) {
//                 event.preventDefault();
//                 savePresentation(presentation);
//             }
//         },
//         [dispatch, canUndo, canRedo]
//     );
//
//     useEffect(() => {
//         document.addEventListener("keydown", historyHotKeys);
//         document.addEventListener("keydown", saveHotKeys);
//         return () => {
//             document.removeEventListener("keydown", historyHotKeys);
//             document.removeEventListener("keydown", saveHotKeys);
//         };
//     }, [historyHotKeys, saveHotKeys]);
//     return null;
// };
// export default UndoRedoManager;

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
                        // Cmd+Shift+Z или Ctrl+Shift+Z для redo
                        dispatch(redo());
                    } else if (canUndo && !event.shiftKey) {
                        // Cmd+Z или Ctrl+Z для undo
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