import { createContext } from "react";
import type { IUser } from "../../services/appwrite/auth.ts";

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    user: IUser | null;
    setUser: (user: any | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    isLoading: true,
    setIsLoading: () => {},
    user: null,
    setUser: () => {},
});
