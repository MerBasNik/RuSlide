import SlideBar from "../SlideBar/SlideBar.tsx";
import classes from "./EditorContainer.module.css";
import WorkSpace from "../WorkSpace/WorkSpace.tsx";
import ThemeBar from "../ThemeBar/ThemeBar.tsx";
import { useContext } from "react";
import { ThemeContext } from "../EditorPage/EditorPage.tsx";

const EditorContainer = () => {
    const { isThemeBarOpen } = useContext(ThemeContext);
    return (
        <main className={classes.editorContainer}>
            <SlideBar />
            <WorkSpace />
            {isThemeBarOpen && <ThemeBar />}
        </main>
    );
};

export default EditorContainer;
