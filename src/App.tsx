import { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu/TopMenu.tsx";
import classes from "./App.module.css";
import EditorContainer from "./components/EditorContainer/EditorContainer.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import UndoRedoManager from "./store/middleware/UndoRedo.ts";
import authService from "../services/appwrite/auth.ts";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const { user, handleLoginSuccess, handleLogout, checkAuth, checkCurrentSession } =
        authService();
    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        checkCurrentSession();
    }, []);

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

    return (
        <div className={classes.app}>
            <UndoRedoManager />
            <TopMenu user={user} onLogout={handleLogout} />
            <EditorContainer />
        </div>
    );
}

export default App;
