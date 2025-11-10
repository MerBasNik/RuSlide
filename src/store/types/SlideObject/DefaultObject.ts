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

export type { SlideObject, DefaultObj, Size, Position };
