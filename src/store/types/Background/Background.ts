type Background = Color | Picture;
export enum TypeBackground {
    Color = "color",
    Picture = "picture",
}
type Color = {
    type: TypeBackground.Color;
    color: string;
};
type Picture = {
    type: TypeBackground.Picture;
    src: string;
};

function setBackgroundColor(color: string): Color {
    return { type: TypeBackground.Color, color: color };
}
function createBackgroundPicture(src: string): Picture {
    return { type: TypeBackground.Picture, src: src };
}

export type { Background, Color, Picture };
export { setBackgroundColor, createBackgroundPicture };
