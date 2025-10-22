import SlideBar from "../SlideBar/SlideBar.tsx";
import classes from "./EditorContainer.module.css";
import type { Slide } from "../../store/types/Presentation/Slide.ts";
import WorkSpace from "../WorkSpace/WorkSpace.tsx";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";

type EditorContainerProps = {
    editor: Presentation;
    SlidesArray: Map<string, Slide>;
};

const EditorContainer = ({ editor, SlidesArray }: EditorContainerProps) => {
    const slides = Array.from(SlidesArray).map(item => item[1]);
    return (
        <main className={classes.editorContainer}>
            <SlideBar editor={editor} slides={slides} />
            <WorkSpace editor={editor} />
        </main>
    );
};

export default EditorContainer;
