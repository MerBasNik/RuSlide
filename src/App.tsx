import TopMenu from "./components/TopMenu/TopMenu.tsx";
import classes from "./App.module.css";
import EditorContainer from "./components/EditorContainer/EditorContainer.tsx";
import type { Presentation } from "./store/types/Presentation/Presentation.ts";

type AppProps = {
    editor: Presentation;
};

function App({ editor }: AppProps) {
    return (
        <div className={classes.app}>
            <TopMenu editor={editor} presentationName={editor.name} />
            <EditorContainer editor={editor} />
        </div>
    );
}

export default App;
