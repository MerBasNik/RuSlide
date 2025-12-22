import { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu/TopMenu.tsx";
import classes from "./App.module.css";
import EditorContainer from "./components/EditorContainer/EditorContainer.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import UndoRedoManager from "./store/middleware/UndoRedo.ts";
import authService from "../services/appwrite/auth.ts";
import { useAppSelector } from "./hooks/useRedux.tsx";
import presentationService from "../services/appwrite/presentation.ts";
import { type Presentation } from "./store/types/Presentation/Presentation.ts";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [allPresentations, setAllPresentations] = useState<any[]>([]);
    const { user, handleLoginSuccess, handleLogout } = authService();
    useEffect(() => {
        const login = async () => {
            await handleLoginSuccess();
        };
        login();
        const loadPres = async () => {
            const presentations = await getAllPresentations();
            setAllPresentations(presentations);
        };
        loadPres();
    }, []);

    const { savePresentation, getPresentation, getAllPresentations } = presentationService();
    const presentation = useAppSelector(state => state.presentation);
    useEffect(() => {
        if (user != null) {
            const handleSave = async () => {
                await savePresentation(presentation);
            };
            const id = setInterval(handleSave, 5000);
            return () => clearInterval(id);
        }
    }, [presentation, savePresentation, user]);

    if (!user) {
        return (
            <div>
                {showRegister ? (
                    <RegisterForm
                        onSuccess={handleLoginSuccess}
                        onSwitchToLogin={() => setShowRegister(false)}
                    />
                ) : (
                    <LoginForm
                        onSuccess={handleLoginSuccess}
                        onSwitchToRegister={() => setShowRegister(true)}
                    />
                )}
            </div>
        );
    }

    const getPres = async (pres: Presentation) => {
        try {
            return await getPresentation(pres.id);
        } catch {
            return false;
        }
    };

    if (!isSelect) {
        return (
            <div className={classes.app}>
                <div className={classes.presentationSelector}>
                    <button
                        onClick={() => setIsSelect(true)}
                        className={classes.newPresentationBtn}
                    >
                        Создать новую презентацию
                    </button>
                    <div className={classes.presentationsList}>
                        {allPresentations.length === 0 ? (
                            <div>Презентаций пока нет</div>
                        ) : (
                            allPresentations.map(pres =>
                                pres != null ? (
                                    <div
                                        key={pres.id}
                                        className={classes.presentationCard}
                                        onClick={async () => {
                                            const isGet = await getPres(pres);
                                            if (isGet) {
                                                setIsSelect(true);
                                            }
                                        }}
                                    >
                                        <h3>{pres.name}</h3>
                                        <p>
                                            Created: {new Date(pres.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : null
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.app}>
            <UndoRedoManager />
            <button onClick={() => setIsSelect(false)} className={classes.backButton}>
                Назад
            </button>
            <TopMenu user={user} onLogout={handleLogout} />
            <EditorContainer />
        </div>
    );
}

export default App;
