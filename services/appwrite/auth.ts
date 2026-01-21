import { account } from './config.ts';
import { ID } from "appwrite";

const authService = () => {
    const getUser = async () => {
        try {
            const userData = await account.get();
            const user: IUser = {
                id: userData.$id,
                username: userData.name,
                email: userData.email,
            }
            return user;
        } catch (error) {
            return null;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            await account.create(ID.unique(), email, password, name);
            await account.createEmailPasswordSession(email, password);
            return await getUser();
        } catch (error) {
            return error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            return await getUser();
        } catch (error) {
            return error;
        }
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        getUser,
        register,
        login,
        handleLogout
    };
};

export interface IUser {
    id: string;
    username: string;
    email: string;
}
export default authService;
