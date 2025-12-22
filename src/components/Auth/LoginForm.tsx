import React, { useState } from "react";
import { account } from "../../../services/appwrite/config.ts";
import classes from "./LoginForm.module.css";

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
}

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await account.createEmailPasswordSession(email, password);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setError("Login failed. Please check your credentials. Error: " + error);
            return null;
        }
    };

    return (
        <div className={classes.formContainer}>
            <div className={classes.blockContainer}>
                <div className={classes.block}></div>
                <div className={classes.block}></div>
                <div className={classes.block}>
                    <form onSubmit={handleLogin} className={classes.form}>
                        <div className={classes.header}>
                            <img src="/images/logo.png" alt="logo" className={classes.headerLogo} />
                            <h2 className={classes.label}>Login</h2>
                        </div>
                        {error && <div>{error}</div>}
                        <div className={classes.formItem}>
                            <label className={classes.label}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={classes.formItem}>
                            <label className={classes.label}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                        </div>
                        <div className={classes.formItem}>
                            {onSwitchToRegister && (
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className={`${classes.btn}`}
                                >
                                    Register
                                </button>
                            )}
                            <button type="submit" className={`${classes.btn} ${classes.loginBtn}`}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className={classes.block}></div>
                <div className={classes.block}></div>
            </div>
        </div>
    );
};

export default LoginForm;
