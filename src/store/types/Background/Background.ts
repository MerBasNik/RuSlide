import type { TextStyle } from "../SlideObject/Text/TextStyle.ts";

type Background = Color | Picture;
export enum TypeBackground {
    Color = "color",
    Picture = "picture",
}
export type Theme = {
    id: string;
    name: string;
    mainSlide: {
        background: Background;
        textStyle: TextStyle;
    };
    allSlides: {
        background: Background;
        textStyle: TextStyle;
    };
};
type Color = {
    type: TypeBackground.Color;
    color: string;
};
type Picture = {
    type: TypeBackground.Picture;
    src: string;
    base64: string;
};

function setBackgroundColor(color: string): Color {
    return { type: TypeBackground.Color, color: color };
}
function createBackgroundPicture(src: string): Picture {
    return { type: TypeBackground.Picture, src: src, base64: "" };
}

export type { Background, Color, Picture };
export { setBackgroundColor, createBackgroundPicture };
