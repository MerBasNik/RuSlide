import { useEffect, useCallback, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import presentationService from "../../../services/appwrite/presentation.ts";
import Popup from "../../UI/Popup/Popup.tsx";

const SaveMiddleware = () => {
    const presentation = useAppSelector(state => state.presentation);
    const { savePresentation } = presentationService();
    const [showSavePopup, setShowSavePopup] = useState(false);

    const saveHotKeys = useCallback(
        async (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
                event.preventDefault();
                if (presentation?.id) {
                    setShowSavePopup(true);
                    await savePresentation(presentation);
                }
            }
        },
        [presentation, savePresentation]
    );

    useEffect(() => {
        document.addEventListener("keydown", saveHotKeys);
        return () => document.removeEventListener("keydown", saveHotKeys);
    }, [saveHotKeys]);

    return (
        <>
            <Popup
                isOpen={showSavePopup}
                onClose={() => setShowSavePopup(false)}
                content="Презентация сохранена"
            />
        </>
    );
};

export default SaveMiddleware;
