import type { PayloadAction } from "@reduxjs/toolkit";
import {
    type Position,
    type Size,
    type SlideObject,
    TypeObject,
} from "../types/SlideObject/DefaultObject.ts";
import type { Presentation } from "../types/Presentation/Presentation.ts";

export const addObjectAction = (state: Presentation, action: PayloadAction<{ slideId: string; obj: SlideObject }>) => {
    const { slideId, obj } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        slide.objects[obj.id] = obj;
        slide.objectsOrder = [...slide.objectsOrder, obj.id];
        slide.selectedObjects = [obj.id];
    }
};
export const deleteObjectAction = (state: Presentation, action: PayloadAction<{ slideId: string; objIds: string[] }>) => {
    const { slideId, objIds } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        objIds.forEach((objId: string) => {
            delete slide.objects[objId];
        });
        slide.objectsOrder = slide.objectsOrder.filter(id => !objIds.includes(id));
        slide.selectedObjects = slide.selectedObjects.filter(id => !objIds.includes(id));
    }
};
export const moveObjectUpAction = (state: Presentation, action: PayloadAction<{ slideId: string; objId: string }>) => {
    const { slideId, objId } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        const objIndex = slide.objectsOrder.indexOf(objId);
        if (objIndex !== -1 && objIndex < slide.objectsOrder.length - 1) {
            const order = [...slide.objectsOrder];
            [order[objIndex], order[objIndex + 1]] = [order[objIndex + 1], order[objIndex]];
            slide.objectsOrder = order;
        }
    }
};
export const moveObjectDownAction = (state: Presentation, action: PayloadAction<{ slideId: string; objId: string }>) => {
    const { slideId, objId } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        const objIndex = slide.objectsOrder.indexOf(objId);
        if (objIndex !== -1 && objIndex > 0) {
            const order = [...slide.objectsOrder];
            [order[objIndex], order[objIndex - 1]] = [order[objIndex - 1], order[objIndex]];
            slide.objectsOrder = order;
        }
    }
};
export const selectObjectAction = (state: Presentation, action: PayloadAction<{ slideId: string; objectIds: string[] }>) => {
    const { slideId, objectIds } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        slide.selectedObjects = [...objectIds];
    }
};
export const setSizeAction = (state: Presentation, action: PayloadAction<{ slideId: string; objId: string; size: Size }>) => {
    const { slideId, objId, size } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        const obj = slide.objects[objId];
        if (obj) {
            obj.size = { ...size };
        }
    }
};
export const setPositionAction = (
    state: Presentation,
    action: PayloadAction<{ slideId: string; positions: Record<string, Position> }>
) => {
    const { slideId, positions } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        Object.entries(positions).forEach(([objId, position]) => {
            const obj = slide.objects[objId];
            if (obj) {
                obj.position = { ...position };
            }
        });
    }
};
export const setRotationAction = (
    state: Presentation,
    action: PayloadAction<{ slideId: string; objId: string; rotation: number }>
) => {
    const { slideId, objId, rotation } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        const obj = slide.objects[objId];
        if (obj) {
            obj.rotation = rotation;
        }
    }
};
export const setContentAction = (
    state: Presentation,
    action: PayloadAction<{ slideId: string; objId: string; content: string }>
) => {
    const { slideId, objId, content } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        const obj = slide.objects[objId];
        if (obj && obj.type === TypeObject.Text) {
            obj.content = content;
        }
    }
};