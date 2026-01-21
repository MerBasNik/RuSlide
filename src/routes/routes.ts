import LoginForm from "../components/Auth/LoginForm.tsx";
import RegisterForm from "../components/Auth/RegisterForm.tsx";
import { type ComponentType } from "react";
import SlideShow from "../components/SlideShow/SlideShow.tsx";
import EditorPage from "../components/EditorPage/EditorPage.tsx";
import HomePage from "../components/HomePage/HomePage.tsx";

export interface RouteType {
    path: string;
    component: ComponentType;
}

export const privateRoutes: RouteType[] = [
    { path: "/ruslide/home", component: HomePage },
    { path: "/ruslide/presentation", component: EditorPage },
    { path: "/ruslide/slide_show", component: SlideShow },
];

export const publicRoutes: RouteType[] = [
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },
];
