import classes from "./EditorPage.module.css";
import UndoRedoManager from "../../store/middleware/UndoRedo.tsx";
import TopMenu from "../TopMenu/TopMenu.tsx";
import EditorContainer from "../EditorContainer/EditorContainer.tsx";
import authService from "../../../services/appwrite/auth.ts";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/context.ts";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import presentationService from "../../../services/appwrite/presentation.ts";
import SaveMiddleware from "../../store/middleware/SaveMiddleware.tsx";

const EditorPage = () => {
    const { setIsAuth, setUser } = useContext(AuthContext);
    const { handleLogout } = authService();
    const presentation = useAppSelector(state => state.presentation);
    const { savePresentation } = presentationService();

    const onLogout = async () => {
        try {
            await handleLogout();
            setIsAuth(false);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (presentation?.id) {
            const handleSave = async () => {
                try {
                    console.log("save");
                    await savePresentation(presentation);
                } catch (error) {
                    console.error("Auto-save failed:", error);
                }
            };
            const id = setInterval(handleSave, 5000);
            return () => clearInterval(id);
        }
    }, [presentation, savePresentation]);

    return (
        <div className={classes.editorPage}>
            <UndoRedoManager />
            <SaveMiddleware />
            <TopMenu onLogout={onLogout} />
            <EditorContainer />
        </div>
    );
};

export default EditorPage;
