import { useContext } from "react";
import { AuthContext } from "../../context/context.ts";
import { Navigate, Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "../../routes/routes.ts";
import Loader from "../../UI/Loader/Loader.tsx";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Routes>
            {publicRoutes.map(r => (
                <Route
                    key={r.path}
                    path={r.path}
                    element={!isAuth ? <r.component /> : <Navigate to="/ruslide/home" />}
                />
            ))}

            {privateRoutes.map(r => (
                <Route
                    key={r.path}
                    path={r.path}
                    element={isAuth ? <r.component /> : <Navigate to="/login" />}
                />
            ))}

            <Route path="/" element={<Navigate to={isAuth ? "/ruslide/home" : "/login"} />} />

            <Route path="*" element={<Navigate to={isAuth ? "/ruslide/home" : "/login"} />} />
        </Routes>
    );
};

export default AppRouter;
