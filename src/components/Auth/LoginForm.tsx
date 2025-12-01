import React, { useState } from "react";
import { account } from "../../../services/appwrite/config.ts";
import authService from "../../../services/appwrite/auth.ts";

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { handleLogout } = authService();
    const checkCurrentSession = async () => {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            return null;
        }
    };

    const logoutAllSessions = async () => {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const currentUser = await checkCurrentSession();
            if (currentUser) {
                await logoutAllSessions();
            }
            await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            console.log(user.name);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.log(err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <div>{error}</div>}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={8}
                    />
                </div>

                <div>
                    <label>Name (for registration)</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter name for registration"
                        disabled={loading}
                    />
                </div>

                <div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                    {onSwitchToRegister && (
                        <button type="button" onClick={onSwitchToRegister}>
                            Switch to Register Form
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
