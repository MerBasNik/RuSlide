import { useState, useEffect } from "react";
import authService from "../services/appwrite/auth.ts";
import { AuthContext } from "./context/context.ts";
import { BrowserRouter } from "react-router";
import AppRouter from "./components/AppRouters/AppRouters.tsx";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    const { getUser } = authService();

    const checkUserAuth = async () => {
        setIsLoading(true);
        try {
            const user = await getUser();
            if (user) {
                setIsAuth(true);
                setUser(user);
            } else {
                setIsAuth(false);
                setUser(null);
            }
        } catch (error) {
            setIsAuth(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isLoading,
                setIsLoading,
                user,
                setUser,
            }}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
