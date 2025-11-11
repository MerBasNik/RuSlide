import type { PayloadAction } from "@reduxjs/toolkit";
import type { Slide } from "../types/Presentation/Slide.ts";
import type { Background } from "../types/Background/Background.ts";
import type { Presentation } from "../types/Presentation/Presentation.ts";

export const setPresentationNameAction = (state: Presentation, action: PayloadAction<string>) => {
    state.name = action.payload;
};
export const addSlideAction = (state: Presentation, action: PayloadAction<Slide>) => {
    const slide = action.payload;
    state.slides[slide.id] = slide;
    state.currentSlide = slide.id;
    state.selectedSlides = [slide.id];
    state.slidesOrder = [...state.slidesOrder, slide.id];
};
export const deleteSlideAction = (state: Presentation, action: PayloadAction<string[]>) => {
    const slideIds = action.payload;
    slideIds.forEach((id: string) => {
        delete state.slides[id];
    });
    state.slidesOrder = state.slidesOrder.filter(id => !slideIds.includes(id));
    state.selectedSlides = state.selectedSlides.filter(id => !slideIds.includes(id));
    state.currentSlide = slideIds.includes(state.currentSlide)
        ? state.slidesOrder[0] || ""
        : state.currentSlide;
};
export const selectSlideAction = (state: Presentation, action: PayloadAction<string[]>) => {
    const selectSlideIds = action.payload;
    state.currentSlide = selectSlideIds[0];
    state.selectedSlides = [...selectSlideIds];
};
export const setSlidesOrderAction = (state: Presentation, action: PayloadAction<string[]>) => {
    state.slidesOrder = [...action.payload];
};
export const setCurrentSlidePresAction = (state: Presentation, action: PayloadAction<string>) => {
    state.currentSlide = action.payload;
};

export const setBackgroundAction = (
    state: Presentation,
    action: PayloadAction<{ slideId: string; background: Background }>
) => {
    const { slideId, background } = action.payload;
    const slide = state.slides[slideId];
    if (slide) {
        slide.background = { ...background };
    }
};
