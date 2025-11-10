import TopMenu from "./components/TopMenu/TopMenu.tsx";
import classes from "./App.module.css";
import EditorContainer from "./components/EditorContainer/EditorContainer.tsx";

function App() {
    return (
        <div className={classes.app}>
            <TopMenu />
            <EditorContainer />
        </div>
    );
}

export default App;
