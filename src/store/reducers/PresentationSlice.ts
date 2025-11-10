import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Slide, SlideObject } from "../types/Presentation/Slide.ts";
import type { Background } from "../types/Background/Background.ts";
import { type Position, type Size, TypeObject } from "../types/SlideObject/DefaultObject.ts";

interface PresentationState {
    name: string;
    slides: Record<string, Slide>;
    slidesOrder: string[];
    selectedSlides: string[];
    currentSlide: string;
}

const initialState: PresentationState = {
    name: "New Presentation",
    slides: {},
    slidesOrder: [],
    selectedSlides: [],
    currentSlide: "",
};

const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {
        setPresentationName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        addSlide: (state, action: PayloadAction<Slide>) => {
            const slide = action.payload;
            state.slides[slide.id] = slide;
            state.currentSlide = slide.id;
            state.selectedSlides = [slide.id];
            state.slidesOrder = [...state.slidesOrder, slide.id];
        },
        deleteSlide: (state, action: PayloadAction<string[]>) => {
            const slideIds = action.payload;
            slideIds.forEach((id: string) => {
                delete state.slides[id];
            });
            state.slidesOrder = state.slidesOrder.filter(id => !slideIds.includes(id));
            state.selectedSlides = state.selectedSlides.filter(id => !slideIds.includes(id));
            state.currentSlide = slideIds.includes(state.currentSlide)
                ? state.slidesOrder[0] || ""
                : state.currentSlide;
        },
        selectSlide: (state, action: PayloadAction<string[]>) => {
            const selectSlideIds = action.payload;
            state.currentSlide = selectSlideIds[0];
            state.selectedSlides = [...selectSlideIds];
        },
        setSlidesOrder: (state, action: PayloadAction<string[]>) => {
            state.slidesOrder = [...action.payload];
        },
        setCurrentSlidePres: (state, action: PayloadAction<string>) => {
            state.currentSlide = action.payload;
        },
        addObject: (state, action: PayloadAction<{ slideId: string; obj: SlideObject }>) => {
            const { slideId, obj } = action.payload;
            const slide = state.slides[slideId];
            if (slide) {
                slide.objects[obj.id] = obj;
                slide.objectsOrder = [...slide.objectsOrder, obj.id];
                slide.selectedObjects = [obj.id];
            }
        },
        deleteObject: (state, action: PayloadAction<{ slideId: string; objIds: string[] }>) => {
            const { slideId, objIds } = action.payload;
            const slide = state.slides[slideId];
            if (slide) {
                objIds.forEach((objId: string) => {
                    delete slide.objects[objId];
                });
                slide.objectsOrder = slide.objectsOrder.filter(id => !objIds.includes(id));
                slide.selectedObjects = slide.selectedObjects.filter(id => !objIds.includes(id));
            }
        },
        moveObjectUp: (state, action: PayloadAction<{ slideId: string; objId: string }>) => {
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
        },
        moveObjectDown: (state, action: PayloadAction<{ slideId: string; objId: string }>) => {
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
        },
        selectObject: (state, action: PayloadAction<{ slideId: string; objectIds: string[] }>) => {
            const { slideId, objectIds } = action.payload;
            const slide = state.slides[slideId];
            if (slide) {
                slide.selectedObjects = [...objectIds];
            }
        },
        setBackground: (
            state,
            action: PayloadAction<{ slideId: string; background: Background }>
        ) => {
            const { slideId, background } = action.payload;
            const slide = state.slides[slideId];
            if (slide) {
                slide.background = { ...background };
            }
        },
        setSize: (state, action: PayloadAction<{ slideId: string; objId: string; size: Size }>) => {
            const { slideId, objId, size } = action.payload;
            const slide = state.slides[slideId];
            if (slide) {
                const obj = slide.objects[objId];
                if (obj) {
                    obj.size = { ...size };
                }
            }
        },
        setPosition: (
            state,
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
        },
        setRotation: (
            state,
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
        },
        setContent: (
            state,
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
        },
    },
});

export const {
    setPresentationName,
    addSlide,
    deleteSlide,
    selectSlide,
    setCurrentSlidePres,
    setSlidesOrder,
    addObject,
    deleteObject,
    moveObjectUp,
    moveObjectDown,
    selectObject,
    setBackground,
    setSize,
    setPosition,
    setRotation,
    setContent,
} = presentationSlice.actions;

export default presentationSlice.reducer;
