import classes from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.spinner}></div>
            <p>Проверка авторизации...</p>
        </div>
    );
};

export default Loader;
