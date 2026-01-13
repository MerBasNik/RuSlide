import React, { useContext, useState } from "react";
import authService from "../../../services/appwrite/auth.ts";
import classes from "./LoginForm.module.css";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/context.ts";

const RegisterForm = () => {
    // const { handleLoginSuccess } = authService();
    const { setIsAuth, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

    const { register, login } = authService();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return null;
        }

        setError("");
        // setIsLoading(true);

        try {
            await register(email, password, name);
            const user = await login(email, password);
            if (user) {
                setUser(user);
                setIsAuth(true);
                navigate("/ruslide/home");
            }
        } catch (error: any) {
            setError("Registration failed: " + error.message);
        } finally {
            // setIsLoading(false);
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
                            <NavLink to="/login" className={`${classes.btn}`}>
                                Login
                            </NavLink>
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
