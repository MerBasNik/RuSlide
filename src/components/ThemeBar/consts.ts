import { type Theme, TypeBackground } from "../../store/types/Background/Background.ts";

export const Themes: Theme[] = [
    {
        id: "1",
        name: "Простая светлая",
        mainSlide: {
            background: { type: TypeBackground.Color, color: "#ffffff" },
            textStyle: { color: "#000000" },
        },
        allSlides: {
            background: { type: TypeBackground.Color, color: "#ffffff" },
            textStyle: { color: "#000000" },
        },
    },
    {
        id: "2",
        name: "Простая тёмная",
        mainSlide: {
            background: { type: TypeBackground.Color, color: "#1c1c1c" },
            textStyle: { color: "#ffffff" },
        },
        allSlides: {
            background: { type: TypeBackground.Color, color: "#1c1c1c" },
            textStyle: { color: "#ffffff" },
        },
    },
    {
        id: "3",
        name: "Модель",
        mainSlide: {
            background: { type: TypeBackground.Picture, src: "/themes/Модель_главная.png" },
            textStyle: { color: "#000000" },
        },
        allSlides: {
            background: { type: TypeBackground.Picture, src: "/themes/Модель_основа.png" },
            textStyle: { color: "#000000" },
        },
    },
    {
        id: "4",
        name: "Поток",
        mainSlide: {
            background: { type: TypeBackground.Picture, src: "/themes/Поток_главная.png" },
            textStyle: { color: "#000000" },
        },
        allSlides: {
            background: { type: TypeBackground.Picture, src: "/themes/Поток_основа.png" },
            textStyle: { color: "#000000" },
        },
    },
    {
        id: "5",
        name: "Мята",
        mainSlide: {
            background: { type: TypeBackground.Picture, src: "/themes/Мята_главная.png" },
            textStyle: { color: "#ffffff" },
        },
        allSlides: {
            background: { type: TypeBackground.Picture, src: "/themes/Мята_основа.png" },
            textStyle: { color: "#000000" },
        },
    },
    {
        id: "6",
        name: "Небо",
        mainSlide: {
            background: { type: TypeBackground.Picture, src: "/themes/Небо_главная.png" },
            textStyle: { color: "#ffffff" },
        },
        allSlides: {
            background: { type: TypeBackground.Picture, src: "/themes/Небо_основа.png" },
            textStyle: { color: "#000000" },
        },
    },
];
