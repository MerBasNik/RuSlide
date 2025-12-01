import SlideBar from "../SlideBar/SlideBar.tsx";
import classes from "./EditorContainer.module.css";
import WorkSpace from "../WorkSpace/WorkSpace.tsx";

const EditorContainer = () => {
    return (
        <main className={classes.editorContainer}>
            <SlideBar />
            <WorkSpace />
        </main>
    );
};

export default EditorContainer;
