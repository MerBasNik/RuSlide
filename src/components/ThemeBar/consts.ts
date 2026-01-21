import { type Background, TypeBackground } from "../../store/types/Background/Background.ts";

export type Theme = {
    id: string;
    name: string;
    mainSlide: {
        background: Background;
    };
    allSlides: {
        background: Background;
    };
};

export const Themes: Theme[] = [
    {
        id: "1",
        name: "светлая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#cc1628" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#ffffff" } },
    },
    {
        id: "2",
        name: "темная",
        mainSlide: { background: { type: TypeBackground.Color, color: "#d5dae2" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#54b9ff" } },
    },
    {
        id: "3",
        name: "яркая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#7ec532" } },
        allSlides: { background: { type: TypeBackground.Picture, src: "" } },
    },
    {
        id: "4",
        name: "светлая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#cc1628" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#ffffff" } },
    },
    {
        id: "5",
        name: "темная",
        mainSlide: { background: { type: TypeBackground.Color, color: "#d5dae2" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#54b9ff" } },
    },
    {
        id: "6",
        name: "светлая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#cc1628" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#ffffff" } },
    },
    {
        id: "7",
        name: "темная",
        mainSlide: { background: { type: TypeBackground.Color, color: "#d5dae2" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#54b9ff" } },
    },
    {
        id: "8",
        name: "светлая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#cc1628" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#ffffff" } },
    },
    {
        id: "9",
        name: "темная",
        mainSlide: { background: { type: TypeBackground.Color, color: "#d5dae2" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#54b9ff" } },
    },
    {
        id: "10",
        name: "светлая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#cc1628" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#ffffff" } },
    },
    {
        id: "11",
        name: "темная",
        mainSlide: { background: { type: TypeBackground.Color, color: "#d5dae2" } },
        allSlides: { background: { type: TypeBackground.Color, color: "#54b9ff" } },
    },
    {
        id: "12",
        name: "яркая",
        mainSlide: { background: { type: TypeBackground.Color, color: "#7ec532" } },
        allSlides: { background: { type: TypeBackground.Picture, src: "" } },
    },
];
