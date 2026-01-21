import { type Background, setBackgroundColor } from "../Background/Background.ts";
import { type SlideObject } from "../SlideObject/DefaultObject.ts";
import { generateId } from "./Id.ts";
import type { Theme } from "../../../components/ThemeBar/consts.ts";

type Slide = {
    id: string;
    objectsOrder: Array<string>;
    background: Background;
    objects: Record<string, SlideObject>;
    selectedObjects: Array<string>;
    currentObject: string;
};

function createSlide(theme: Theme | null): Slide {
    return {
        id: generateId(),
        objects: {},
        objectsOrder: [],
        selectedObjects: [],
        background: theme === null ? setBackgroundColor("#ffffff") : theme.allSlides.background,
        currentObject: "",
    };
}

export type { SlideObject, Slide };

export {
    createSlide,
};
