import SlideBar from "../SlideBar/SlideBar.tsx";
import classes from "./EditorContainer.module.css";
import WorkSpace from "../WorkSpace/WorkSpace.tsx";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";

type EditorContainerProps = {
    editor: Presentation;
};

const EditorContainer = ({ editor }: EditorContainerProps) => {
    return (
        <main className={classes.editorContainer}>
            <SlideBar />
            <WorkSpace editor={editor} />
        </main>
    );
};

export default EditorContainer;
