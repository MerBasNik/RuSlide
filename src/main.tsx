import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { addEditorChangeHandler, editor } from "./store/StoreEditor/Editor.tsx";
import { Provider } from "react-redux";
import { store } from "./store";

const root = createRoot(document.getElementById("root")!);
console.log("store", store);
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App editor={editor} />
            </Provider>
        </StrictMode>
    );
}

addEditorChangeHandler(render);
render();
