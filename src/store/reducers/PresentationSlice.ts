import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Slide, SlideObject } from "../types/Presentation/Slide.ts";
import type { Background } from "../types/Background/Background.ts";
import type { Position, Size } from "../types/SlideObject/DefaultObject.ts";

interface PresentationState {
    name: string;
    slides: Map<string, Slide>;
    slidesOrder: Array<string>;
    selectedSlides: Array<string>;
    currentSlide: string;
}

const initialState: PresentationState = {
    name: "New Presentation",
    slides: new Map<string, Slide>(),
    slidesOrder: [],
    selectedSlides: [],
    currentSlide: "",
}


const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {
        setPresentationName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        addSlide: (state, action: PayloadAction<Slide>) => {
            const slide = action.payload;
            state.slides = new Map(state.slides).set(slide.id, slide);
            state.currentSlide = slide.id;
            state.selectedSlides = [slide.id];
            state.slidesOrder = [...state.slidesOrder, slide.id];
        },
        deleteSlide: (state, action: PayloadAction<string[]>) => {
            const newSlides = new Map(state.slides);
            const slideIds = action.payload;
            slideIds.map((id: string) => {
                newSlides.delete(id);
            });
            state.slides = newSlides;
            state.slidesOrder = state.slidesOrder.filter(id => !slideIds.includes(id));
            state.selectedSlides = state.selectedSlides.filter(id => !slideIds.includes(id));
            state.currentSlide = slideIds.includes(state.currentSlide)
                ? state.slidesOrder[0] || ""
                : state.currentSlide;
        },
        selectSlide: (state, action: PayloadAction<string>) => {
            const selectSlideId = action.payload;
            if (state.slides.has(selectSlideId)) {
                state.currentSlide = selectSlideId;
                state.selectedSlides = [selectSlideId];
            }
        },
        addSlideToSelection: (state, action: PayloadAction<string>) => {
            const selectSlideId = action.payload;
            if (state.slides.has(selectSlideId) && !state.selectedSlides.includes(selectSlideId)) {
                state.selectedSlides = [...state.selectedSlides, selectSlideId];
            }
        },
        setSlidesOrder: (state, action: PayloadAction<string[]>) => {
            state.slidesOrder = [...action.payload];
        },
        setCurrentSlidePres: (state, action: PayloadAction<string>) => {
            state.currentSlide = action.payload;
        },
        addObject: (state, action: PayloadAction<{ slideId: string; obj: SlideObject }>) => {
            const { slideId, obj } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                slide.objects = new Map(slide.objects).set(obj.id, obj);
                slide.objectsOrder = [...slide.objectsOrder, obj.id];
                slide.selectedObjects = [obj.id];
                state.slides.set(slideId, slide);
            }
        },
        deleteObject: (state, action: PayloadAction<{ slideId: string; objIds: string[] }>) => {
            const { slideId, objIds } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const newObjects = new Map(slide.objects);
                objIds.map((objId: string) => {
                    newObjects.delete(objId);
                });
                const newSlide = {
                    ...slide,
                    objects: newObjects,
                    objectsOrder: slide.objectsOrder.filter(id => !objIds.includes(id)),
                    selectedObjects: slide.selectedObjects.filter(id => !objIds.includes(id)),
                };
                state.slides.set(slideId, newSlide);
            }
        },
        moveObjectUp: (state, action: PayloadAction<{ slideId: string; objId: string }>) => {
            const { slideId, objId } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const objIndex = slide.objectsOrder.indexOf(objId);
                if (objIndex !== -1 && objIndex < slide.objectsOrder.length - 1) {
                    const order = [...slide.objectsOrder];
                    [order[objIndex], order[objIndex + 1]] = [order[objIndex + 1], order[objIndex]];
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: order,
                        selectedObjects: [...slide.selectedObjects],
                    };
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        moveObjectDown: (state, action: PayloadAction<{ slideId: string; objId: string }>) => {
            const { slideId, objId } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const objIndex = slide.objectsOrder.indexOf(objId);
                if (objIndex !== -1 && objIndex > 0) {
                    const order = [...slide.objectsOrder];
                    [order[objIndex], order[objIndex - 1]] = [order[objIndex - 1], order[objIndex]];
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: order,
                        selectedObjects: [...slide.selectedObjects],
                    };
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        selectObject: (state, action: PayloadAction<{ slideId: string; objectId: string }>) => {
            const { slideId, objectId } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                if (slide.objects.has(objectId)) {
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: [...slide.objectsOrder],
                        selectedObjects: [objectId],
                    };
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        addObjectToSelection: (
            state,
            action: PayloadAction<{ slideId: string; objectId: string }>
        ) => {
            const { slideId, objectId } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                if (slide.objects.has(objectId) && !slide.selectedObjects.includes(objectId)) {
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: [...slide.objectsOrder],
                        selectedObjects: [...slide.selectedObjects, objectId],
                    };
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        setBackground: (
            state,
            action: PayloadAction<{ slideId: string; background: Background }>
        ) => {
            const { slideId, background } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const newSlide = {
                    ...slide,
                    background: { ...background },
                    objects: new Map(slide.objects),
                    objectsOrder: [...slide.objectsOrder],
                    selectedObjects: [...slide.selectedObjects],
                };
                state.slides.set(slideId, newSlide);
            }
        },
        setSize: (state, action: PayloadAction<{ slideId: string; objId: string; size: Size }>) => {
            const { slideId, objId, size } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const obj = slide.objects.get(objId);
                if (obj) {
                    const newObj = { ...obj, size: { ...size } };
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: [...slide.objectsOrder],
                        selectedObjects: [...slide.selectedObjects],
                    };
                    newSlide.objects.set(objId, newObj);
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        setPosition: (
            state,
            action: PayloadAction<{ slideId: string; positions: Map<string, Position> }>
        ) => {
            const { slideId, positions } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const newSlide = {
                    ...slide,
                    objects: new Map(slide.objects),
                };

                positions.forEach((position, objId) => {
                    const obj = newSlide.objects.get(objId);
                    if (obj) {
                        const newObj = {
                            ...obj,
                            position: { ...position },
                        };
                        newSlide.objects.set(objId, newObj);
                    }
                });

                state.slides.set(slideId, newSlide);
            }
        },
        setRotation: (state, action: PayloadAction<{ slideId: string; objId: string; rotation: number }>) => {
            const { slideId, objId, rotation } = action.payload;

            const slide = state.slides.get(slideId);
            if (slide) {
                const obj = slide.objects.get(objId);
                if (obj) {
                    const newObj = { ...obj, rotation: rotation };
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: [...slide.objectsOrder],
                        selectedObjects: [...slide.selectedObjects],
                    };
                    newSlide.objects.set(objId, newObj);
                    state.slides.set(slideId, newSlide);
                }
            }
        },
        setContent: (state, action: PayloadAction<{slideId: string; objId: string; content: string}>) => {
            const { slideId, objId, content } = action.payload;
            const slide = state.slides.get(slideId);
            if (slide) {
                const obj = slide.objects.get(objId);
                if (obj) {
                    const newObj = { ...obj, content: content };
                    const newSlide = {
                        ...slide,
                        objects: new Map(slide.objects),
                        objectsOrder: [...slide.objectsOrder],
                        selectedObjects: [...slide.selectedObjects],
                    };
                    newSlide.objects.set(objId, newObj);
                    state.slides.set(slideId, newSlide);
                }
            }
        }
    },
});

export const {
    setPresentationName,
    addSlide,
    deleteSlide,
    selectSlide,
    addSlideToSelection,
    setCurrentSlidePres,
    setSlidesOrder,
    addObject,
    deleteObject,
    moveObjectUp,
    moveObjectDown,
    selectObject,
    addObjectToSelection,
    setBackground,
    setSize,
    setPosition,
    setRotation,
    setContent,
} = presentationSlice.actions;

export default presentationSlice.reducer;