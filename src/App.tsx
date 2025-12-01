import TopMenu from "./components/TopMenu/TopMenu.tsx";
import classes from "./App.module.css";
import EditorContainer from "./components/EditorContainer/EditorContainer.tsx";
import { useUndoStack } from "./hooks/useUndoRedo.ts";

function App() {
    const { push, undo, redo, clear, undoAvailable, redoAvailable } = useUndoStack();

    return (
        <div className={classes.app}>
            <TopMenu
                push={push}
                undo={undo}
                redo={redo}
                clear={clear}
                undoAvailable={undoAvailable}
                redoAvailable={redoAvailable}
            />
            <EditorContainer push={push} />
        </div>
    );
}

export default App;