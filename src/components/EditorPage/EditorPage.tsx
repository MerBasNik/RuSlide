import classes from "./EditorPage.module.css";
import UndoRedoManager from "../../store/middleware/UndoRedo.tsx";
import TopMenu from "../TopMenu/TopMenu.tsx";
import EditorContainer from "../EditorContainer/EditorContainer.tsx";
import authService from "../../../services/appwrite/auth.ts";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/context.ts";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import presentationService from "../../../services/appwrite/presentation.ts";
import SaveMiddleware from "../../store/middleware/SaveMiddleware.tsx";

type ThemeContextType = {
    isThemeBarOpen: boolean;
    toggleThemeBar: () => void;
};
export const ThemeContext = createContext<ThemeContextType>({
    isThemeBarOpen: false,
    toggleThemeBar: () => {},
});

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
                    await savePresentation(presentation);
                } catch (error) {
                    console.error("Auto-save failed:", error);
                }
            };
            const id = setInterval(handleSave, 5000);
            return () => clearInterval(id);
        }
    }, [presentation, savePresentation]);

    const [isThemeBarOpen, setIsThemeBarOpen] = useState(false);
    const toggleThemeBar = () => setIsThemeBarOpen(!isThemeBarOpen);

    return (
        <ThemeContext.Provider value={{ isThemeBarOpen, toggleThemeBar }}>
            <div className={classes.editorPage}>
                <UndoRedoManager />
                <SaveMiddleware />
                <TopMenu onLogout={onLogout} />
                <EditorContainer />
            </div>
        </ThemeContext.Provider>
    );
};

export default EditorPage;
