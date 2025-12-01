import { account, ID } from './config';
import { useState } from "react";

export interface User {
    $id: string;
    email: string;
    name: string;
}

const authService = () => {
    const [user, setUser] = useState<User | null>(null);

    const register = async (email: string, password: string, name: string) => {
        try {
            await logoutIfNeeded();
            await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return await login(email, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };
    const login = async (email: string, password: string) => {
        try {
            await logoutIfNeeded();
            await account.createEmailPasswordSession(email, password);
            return await getCurrentUser() as User;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };
    const logoutIfNeeded = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                await account.deleteSessions();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const user = await account.get();
            return {
                $id: user.$id,
                email: user.email,
                name: user.name
            } as User;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const checkCurrentSession = async () => {
        try {
            const user = await account.get();
            setUser(user);
            console.log("Current user:", user);
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    };
    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const checkAuth = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error("Auth check failed:", error);
        }
    };
    const handleLoginSuccess = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    return {
        user,
        register,
        login,
        handleLogout,
        handleLoginSuccess,
        checkAuth,
        checkCurrentSession
    };
};

export default authService;
