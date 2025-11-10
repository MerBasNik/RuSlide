import { type Background, setBackgroundColor } from "../Background/Background.ts";
import { type SlideObject } from "../SlideObject/DefaultObject.ts";
import { generateId } from "./Id.ts";

type Slide = {
    id: string;
    objectsOrder: Array<string>;
    background: Background;
    objects: Record<string, SlideObject>;
    selectedObjects: Array<string>;
};

function createSlide(): Slide {
    return {
        id: generateId(),
        objects: {},
        objectsOrder: [],
        selectedObjects: [],
        background: setBackgroundColor("#ffffff"),
    };
}

export type { SlideObject, Slide };

export {
    createSlide,
};
