import { type Background, setBackgroundColor } from "../Background/Background.ts";
import { type SlideObject } from "../SlideObject/DefaultObject.ts";
import { generateId } from "./Id.ts";
import type { Presentation } from "./Presentation.ts";

type Slide = {
    id: string;
    order: number;
    objectsOrder: Array<string>;
    background: Background;
    objects: Map<string, SlideObject>;
    selectedObjects: Array<string>;
};

function createSlide(index: number): Slide {
    return {
        id: generateId(),
        order: index,
        objects: new Map<string, SlideObject>(),
        objectsOrder: [],
        selectedObjects: [],
        background: setBackgroundColor("#ffffff"),
    };
}

function addObject(presentation: Presentation, slideId: string, obj: SlideObject): Presentation {
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
        objects: new Map(slide.objects).set(obj.id, obj),
        objectsOrder: [...slide.objectsOrder, obj.id],
        selectedObjects: [obj.id],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function deleteObject(presentation: Presentation, slideId: string, objId: string): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const newObjects = new Map(slide.objects);
    newObjects.delete(objId);
    const newSlide = {
        ...slide,
        objects: newObjects,
        objectsOrder: slide.objectsOrder.filter(id => id !== objId),
        selectedObjects: slide.selectedObjects.filter(id => id !== objId),
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function moveObjectUp(presentation: Presentation, slideId: string, id: string): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const objIndex = slide.objectsOrder.indexOf(id);
    if (objIndex === -1 || objIndex >= slide.objectsOrder.length - 1) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const order = [...slide.objectsOrder];
    [order[objIndex], order[objIndex + 1]] = [order[objIndex + 1], order[objIndex]];
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: order,
        selectedObjects: [...slide.selectedObjects],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}

function Temp(presentation: Presentation, slideId: string, objectIds: string[]): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide || objectIds.length === 0) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const order = [...slide.objectsOrder];
    console.log("order: ", order);
    let hasChanges = false;
    const objectIndices = objectIds
        .map(id => order.indexOf(id))
        .filter(index => index !== -1)
        .sort((a, b) => b - a);
    console.log("objectIndices: ", objectIndices);
    for (const currentIndex of objectIndices) {
        if (currentIndex < order.length - 1) {
            const nextIndex = currentIndex + 1;

            if (!objectIds.includes(order[nextIndex])) {
                [order[currentIndex], order[nextIndex]] = [order[nextIndex], order[currentIndex]];
                hasChanges = true;
            }
        }
    }
    if (!hasChanges) {
        return presentation;
    }
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: order,
        selectedObjects: [...slide.selectedObjects],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}

function moveObjectDown(presentation: Presentation, slideId: string, id: string): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    const objIndex = slide.objectsOrder.indexOf(id);
    if (objIndex === -1 || objIndex <= 0) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const order = [...slide.objectsOrder];
    [order[objIndex], order[objIndex - 1]] = [order[objIndex - 1], order[objIndex]];
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: order,
        selectedObjects: [...slide.selectedObjects],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function selectObject(
    presentation: Presentation,
    slideId: string,
    selectObjectId: string
): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    if (!slide.objects.has(selectObjectId)) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: [...slide.objectsOrder],
        selectedObjects: [selectObjectId],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function addObjectToSelection(
    presentation: Presentation,
    slideId: string,
    selectObjectId: string
): Presentation {
    const slide = presentation.slides.get(slideId);
    if (!slide) {
        return presentation;
    }
    if (!slide.objects.has(selectObjectId) || slide.selectedObjects.includes(selectObjectId)) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: [...slide.objectsOrder],
        selectedObjects: [...slide.selectedObjects, selectObjectId],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
function setBackground(
    presentation: Presentation,
    slideId: string,
    background: Background
): Presentation {
    console.log(slideId, background);
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
        background: { ...background },
        objects: new Map(slide.objects),
        objectsOrder: [...slide.objectsOrder],
        selectedObjects: [...slide.selectedObjects],
    };
    newPresentation.slides.set(slideId, newSlide);
    console.log(newPresentation);
    return newPresentation;
}

export type { SlideObject, Slide };

export {
    createSlide,
    addObject,
    deleteObject,
    setBackground,
    moveObjectDown,
    moveObjectUp,
    selectObject,
    addObjectToSelection,
    Temp,
};
