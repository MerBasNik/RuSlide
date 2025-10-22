import { type DefaultObj, type Position, type Size, TypeObject } from "./DefaultObject.ts";
import { generateId } from "../Presentation/Id.ts";

type Image = DefaultObj & {
    type: TypeObject.Image;
    src: string;
};

function createImage(src: string, size: Size, position: Position): Image {
    return {
        id: generateId(),
        type: TypeObject.Image,
        size: { ...size },
        position: { ...position },
        rotation: 0,
        src: src,
    };
}

export type { Image };

export { createImage };
