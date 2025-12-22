import { account, ID } from "./config";
import { useState } from "react";

export interface User {
    id: string;
    email: string;
    name: string;
}

const authService = () => {
    const [user, setUser] = useState<User | null>(null);
    const register = async (email: string, password: string, name: string) => {
        try {
            await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return await login(email, password);
        } catch {
            return null;
        }
    };
    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            return currentUser;
        } catch {
            return null;
        }
    };

    const getCurrentUser = async () => {
        try {
            const user = await account.get();
            return {
                id: user.$id,
                email: user.email,
                name: user.name
            } as User;
        } catch {
            return null;
        }
    };
    const handleLogout = async () => {
        await account.deleteSession("current");
        setUser(null);
    };

    const checkAuth = async () => {
        const currentUser = await getCurrentUser();
        const isAuth = currentUser?.id === user?.id;
        if (isAuth) {
            return true;
        } else {
            setUser(currentUser);
        }
        return false;
    };
    const handleLoginSuccess = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch {
            return null;
        }
    };

    return {
        user,
        register,
        login,
        handleLogout,
        handleLoginSuccess,
        checkAuth,
        getCurrentUser
    };
};

export default authService;
