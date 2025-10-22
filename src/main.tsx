import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { addEditorChangeHandler, editor } from "./store/StoreEditor/Editor.tsx";

const root = createRoot(document.getElementById("root")!);
function render() {
    root.render(
        <StrictMode>
            <App editor={editor} />
        </StrictMode>
    );
}

addEditorChangeHandler(render);
render();
