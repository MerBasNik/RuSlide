import { type DefaultObj, type Position, type Size, TypeObject } from "./DefaultObject.ts";
import { generateId } from "../Presentation/Id.ts";

type Image = DefaultObj & {
    type: TypeObject.Image;
    src: string;
    base64?: string;
    // fileId?: string;
};

function createImage(src: string, size: Size, position: Position, base64: string): Image {
    return {
        id: generateId(),
        type: TypeObject.Image,
        size: { ...size },
        position: { ...position },
        rotation: 0,
        src: src,
        base64: base64,
        // fileId: fileId,
    };
}

export type { Image };

export { createImage };
