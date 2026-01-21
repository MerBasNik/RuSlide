import React, { useContext, useState } from "react";
import classes from "./LoginForm.module.css";
import authService from "../../../services/appwrite/auth.ts";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/context.ts";

const LoginForm = () => {
    const { setIsAuth, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { login } = authService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const user = await login(email, password);
            if (user) {
                setUser(user);
                setIsAuth(true);
                navigate("/ruslide/home");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error: any) {
            setError("Login failed: " + error.message);
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
                            <NavLink to="/register" className={`${classes.btn}`}>
                                Register
                            </NavLink>
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
