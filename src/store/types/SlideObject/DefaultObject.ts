import type { Image } from "./Image.ts";
import type { Text } from "./Text/Text.ts";

type SlideObject = Text | Image;
export enum TypeObject {
    Text = "text",
    Image = "image",
}

type DefaultObj = {
    id: string;
    size: Size;
    position: Position;
    rotation: number;
};

type Size = {
    width: number;
    height: number;
};
type Position = {
    x: number;
    y: number;
};

function setSize(obj: SlideObject, size: Size): SlideObject {
    return { ...obj, size: { ...size } };
}
function setPosition(obj: SlideObject, position: Position): SlideObject {
    return { ...obj, position: { ...position } };
}
function setRotation(obj: SlideObject, rotation: number): SlideObject {
    return { ...obj, rotation: rotation };
}

export type { SlideObject, DefaultObj, Size, Position };

export { setSize, setRotation, setPosition };
