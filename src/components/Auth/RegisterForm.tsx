import React, { useState } from "react";
import authService from "../../../services/appwrite/auth.ts";
import classes from "./LoginForm.module.css";

interface RegisterFormProps {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = authService();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return null;
        }
        setError("");
        try {
            await register(email, password, name);
            onSuccess();
        } catch (error) {
            setError("Registration failed. Error: " + error);
            return null;
        }
    };

    return (
        <div className={classes.formContainer}>
            <div className={classes.blockContainer}>
                <div className={classes.block}></div>
                <div className={classes.block}></div>
                <div className={classes.block}>
                    <form onSubmit={handleRegister} className={classes.form}>
                        <div className={classes.header}>
                            <img src="/images/logo.png" alt="logo" className={classes.headerLogo} />
                            <h2 className={classes.label}>Register</h2>
                        </div>
                        {error && <div>{error}</div>}
                        <div className={classes.formItem}>
                            <label className={classes.label}>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
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
                            />
                        </div>
                        <div className={classes.formItem}>
                            <label className={classes.label}>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={classes.formItem}>
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className={`${classes.btn}`}
                            >
                                Login
                            </button>
                            <button
                                type="submit"
                                className={`${classes.btn} ${classes.registerBtn}`}
                            >
                                Register
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

export default RegisterForm;
