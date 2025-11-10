import type { Image } from "./Image.ts";
import type { Text } from "./Text/Text.ts";
import type { Presentation } from "../Presentation/Presentation.ts";

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

function setSize(presentation: Presentation, slideId: string, objId: string, size: Size): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const obj = slide.objects.get(objId);
    if (!obj) {
        return presentation;
    }
    const newObj = { ...obj, size: {...size} };
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: [...slide.objectsOrder],
        selectedObjects: [...slide.selectedObjects],
    };
    newSlide.objects.set(objId, newObj);
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function setPosition(presentation: Presentation, slideId: string, positions: Map<string, Position>): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
    };

    positions.forEach((position, objId) => {
        const obj = newSlide.objects.get(objId);
        if (obj) {
            const newObj = {
                ...obj,
                position: { ...position }
            };
            newSlide.objects.set(objId, newObj);
        }
    });

    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function setRotation(presentation: Presentation, slideId: string, objId: string, rotation: number): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const obj = slide.objects.get(objId);
    if (!obj) {
        return presentation;
    }
    const newObj = { ...obj, rotation: rotation };
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: [...slide.objectsOrder],
        selectedObjects: [...slide.selectedObjects],
    };
    newSlide.objects.set(objId, newObj);
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}

export type { SlideObject, DefaultObj, Size, Position };

export { setSize, setRotation, setPosition };
