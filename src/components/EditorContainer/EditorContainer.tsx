import SlideBar from "../SlideBar/SlideBar.tsx";
import classes from "./EditorContainer.module.css";
import WorkSpace from "../WorkSpace/WorkSpace.tsx";

type EditorContainerProps = {
    push: (doFn: any, undoFn: any, ...argsToClone: any[]) => void;
};

const EditorContainer = ({ push }: EditorContainerProps) => {
    return (
        <main className={classes.editorContainer}>
            <SlideBar push={push} />
            <WorkSpace push={push} />
        </main>
    );
};

export default EditorContainer;
